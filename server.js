require("dotenv").config();
const express = require("express");
const qs = require("qs");
const path = require("path");
const axios = require("axios");
const cookieParser = require("cookie-parser");

const app = express();

var secret = process.env.SECRET_KEY;
var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var redirect_uri = process.env.REDIRECT_URI;
var scope = process.env.SCOPE;
var stateKey = "spotify_auth_state";

app.use(cookieParser(secret));
app.use(express.static(__dirname + "/public"));

var access = null;

const generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const errorHandler = (error, origin) => {
  console.log(origin);
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    console.log("Error", error.message);
  } else if (error.request) {
    console.log(error.request);
    console.log("Error", error.message);
  } else {
    console.log("Error", error.message);
  }
};

const sessionActive = (signedCookies) => {
  let active =
    Object.keys(signedCookies).length == 0 ? false : !!signedCookies.token;
  return active;
};

const getAccessToken = async (signedCookies) => {
  if (!sessionActive(signedCookies)) return null;

  return JSON.parse(signedCookies.token).access_token;
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/api/login", (req, res) => {
  if (sessionActive(req.signedCookies)) {
    res.redirect("http://localhost:3000");
    return;
  }
  var state = generateRandomString(32);
  res.cookie(stateKey, state, { signed: true, httpOnly: true });
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      qs.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

app.get("/callback", async (req, res) => {
  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.signedCookies ? req.signedCookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        qs.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);

    try {
      let response = await axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        data: new URLSearchParams({
          code: code,
          redirect_uri: redirect_uri,
          grant_type: "authorization_code",
        }),
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
        responseType: "json",
      });
      res.cookie("token", JSON.stringify(response.data), {
        signed: true,
        httpOnly: true,
      });
      res.redirect("http://localhost:3000");
    } catch (error) {
      errorHandler(error, "callback");
    }
  }
});

app.get("refresh-token", async (req, res) => {
  let refresh_token = req.query.refresh_token;

  try {
    let response = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      data: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      }),
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      responseType: "json",
    });

    access = response.data;
    res.send(response.data);
  } catch (error) {
    errorHandler(error, "refresh_token");
  }
});

app.get("/api/genres", async (req, res) => {
  try {
    let response = await axios({
      method: "get",
      url: "https://api.spotify.com/v1/recommendations/available-genre-seeds",
      headers: {
        Authorization: `Bearer ${access.access_token}`,
        "Content-Type": "application/json",
      },
    });
    res.send(response.data);
  } catch (error) {
    errorHandler(error, "genres");
  }
});

app.get("/api/top-artists", async (req, res) => {
  let timeRange = req.query.time_range || "long_term";
  let accessToken =
    (await getAccessToken(req.signedCookies)) || access.access_token;
  let items = req.query.items || 50;

  try {
    let response = await axios({
      method: "get",
      url:
        "https://api.spotify.com/v1/me/top/artists?" +
        qs.stringify({ time_range: timeRange, limit: items }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    res.send(response.data);
  } catch (error) {
    errorHandler(error, "top-artists");
  }
});

app.get("/api/top-tracks", async (req, res) => {
  let timeRange = req.query.timeRange || "long_term";
  let accessToken =
    (await getAccessToken(req.signedCookies)) || access.access_token;
  let items = req.query.items || 50;

  try {
    if (timeRange == "all") {
      let data = {};
      let timeRanges = ["short_term", "medium_term", "long_term"];
      for (const range of timeRanges) {
        let response = await axios({
          method: "get",
          url:
            "https://api.spotify.com/v1/me/top/tracks?" +
            qs.stringify({ time_range: range, limit: parseInt(items) }),
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        data[range] = response.data;
      }
      res.send(data);
    } else {
      let response = await axios({
        method: "get",
        url:
          "https://api.spotify.com/v1/me/top/tracks?" +
          qs.stringify({ time_range: timeRange, limit: parseInt(items) }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      res.send(response.data);
    }
  } catch (error) {
    errorHandler(error, "top-tracks");
    return;
  }
});

app.get("/api/session-active", async (req, res) => {
  res.json(sessionActive(req.signedCookies));
});

app.listen(5000);
