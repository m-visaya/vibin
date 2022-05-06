require("dotenv").config();
const express = require("express");
const qs = require("qs");
const axios = require("axios");
const cookieParser = require("cookie-parser");

const app = express();

var secret = process.env.SECRET_KEY;
var client_id = process.env.CLIENT_ID;
var redirect_uri = process.env.REDIRECT_URI;
var scope = process.env.SCOPE;
var stateKey = "spotify_auth_state";

app.use(cookieParser(secret));

const generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.get("/api/auth", (req, res) => {
  var state = generateRandomString(32);
  res.cookie(stateKey, state, { signed: true, httpOnly: true });

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      qs.stringify({
        response_type: "token",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

app.get("/api/verify-state", (req, res) => {
  const state = req.query.state || null;
  const storedState = req.signedCookies ? req.signedCookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.status(401);
  } else {
    res.clearCookie(stateKey);
    res.send(true);
  }
});

app.get("/callback", async (req, res) => {
  res.redirect("http://localhost:3000");
});

app.get("/api/top-artists", async (req, res) => {
  const timeRange = req.query.time_range || "long_term";
  const accessToken = req.query.access_token || null;
  const items = req.query.items || 50;

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
    res.status(500).send("Something went wrong");
  }
});

app.get("/api/top-tracks", async (req, res) => {
  const timeRange = req.query.timeRange || "all";
  const accessToken = req.query.access_token || null;
  const items = req.query.items || 50;

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
    res.status(500).send("Something went wrong");
  }
});

app.get("/api/user-profile", async (req, res) => {
  const accessToken = req.query.access_token || null;

  try {
    let response = await axios({
      method: "get",
      url: "https://api.spotify.com/v1/me",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/api/listening-stats", async (req, res) => {
  const accessToken = req.query.access_token || null;
  const ids = req.query.ids || null;

  try {
    let response = await axios({
      method: "get",
      url:
        "https://api.spotify.com/v1/audio-features?" +
        qs.stringify({ ids: ids }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(5000);
