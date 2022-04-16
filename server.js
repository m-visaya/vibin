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

const getTopTracks = async (time_range, accessToken, items) => {
  try {
    let response = await axios({
      method: "get",
      url:
        "https://api.spotify.com/v1/me/top/tracks?" +
        qs.stringify({ time_range: time_range, limit: parseInt(items) }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
};

const getTopArtists = async (accessToken) => {
  try {
    let response = await axios({
      method: "get",
      url:
        "https://api.spotify.com/v1/me/top/artists?" +
        qs.stringify({ time_range: "long_term", limit: 4 }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/login", (req, res) => {
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

      access = response.data;
      res.send(response.data);
    } catch (error) {
      console.log("callback error");
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  }
});

app.get("refresh_token", async (req, res) => {
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
    console.log("callback error");
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
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
    console.log("request error");
  }
});

app.get("/api/top-artists", async (req, res) => {
  let data = await getTopArtists(access.access_token);
  res.send(data);
});

app.get("/api/top-tracks", async (req, res) => {
  let data = await getTopTracks("long_term", access.access_token, 50);
  res.send(data);
});

app.listen(5000);
