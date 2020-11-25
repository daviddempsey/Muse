// Taken from the web-api-auth-examples repo from spotify

/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

//import * as data_access from './data_access.js'; // Import firebase functions

var express = require("express"); // Express web server framework
var request = require("request"); // "Request" library
var querystring = require("querystring");
var cookieParser = require("cookie-parser");

var client_id = "3068918efe6349bfa18633d5dd854b6a"; // Your client id
var client_secret = "93f20dfbf9a64d7cbf7f0832e5f0ccf3"; // Your secret
var redirect_uri = "http://localhost:8888/callback"; // Your redirect uri

var firebase = require("firebase/app");
require("firebase/auth");

firebase.initializeApp({
  apiKey: "AIzaSyCXHNEOM_Y2rdIC3kvncBsYd7gAf88HJ6g",
  authDomain: "muse-eec76.firebaseapp.com",
  databaseURL: "https://muse-eec76.firebaseio.com",
  projectId: "muse-eec76",
  storageBucket: "muse-eec76.appspot.com",
  messagingSenderId: "1076771976447",
  appId: "1:1076771976447:web:41acb692f55285ef9a08ca",
  measurementId: "G-3D6DCMR4W7",
});

const debug = require("debug")("firestore-snippets-node"); // firebase debug
const admin = require("firebase-admin"); // firebase admin account
//const console = {log: debug}; // the console to log debug messages

var serviceAccount = require("./functions/permissions.json"); // service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://muse-eec76.firebaseio.com",
});

const app = express();
const fsdb = admin.firestore();

// create cores
const cors = require("cors");
app.use(cors({ origin: true }));

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = "spotify_auth_state";

app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .use(cookieParser());

/**
 * Creates a user based on Firebase based on Spotify's information into database
 * @param {*} userEmail user email
 * @param {*} displayName user's name
 * @param {*} spotifyID user's spotifyID
 * @param {*} refreshToken user's refreshToken
 */
async function createFirebaseUser(
  userEmail,
  displayName,
  spotifyID,
  refreshToken
) {
  admin
    .auth()
    .updateUser(spotifyID, {
      displayName: displayName,
    })
    .catch((error) => {
      // if user does not exist, we create one
      if (error.code === "auth/user-not-found") {
        return admin.auth().createUser({
          uid: spotifyID,
          displayName: displayName,
          refreshToken: refreshToken,
          email: userEmail,
        });
      }
    });
}

/**
 * Creates a user based on the user's Spotify information into the database
 * that's passed in.
 *
 * @param {*} db reference to the database to add to
 * @param {*} email email of the user
 * @param {*} displayName name of the user
 * @param {*} spotifyID Spotify ID of the user
 * @param {*} refreshToken Spotify refresh token of the user
 */
async function createUser(db, email, displayName, spotifyID, refreshToken) {
  // create a data document to be stored
  const userData = {
    name: displayName,
    spotify_id: spotifyID,
    refresh_token: refreshToken,
    location: [],
    profile: email,
    friends: [],
    messages: [],
    stats_id: email,
    in_harmony: email,
  };

  await createFirebaseUser(email, displayName, spotifyID, refreshToken);

  // create a custom auth token
  const token = await admin.auth().createCustomToken(spotifyID);
  console.log("Created custom token for UID", spotifyID, "Token:", token);

  // attempt to sign in to the application
  firebase
    .auth()
    .signInWithCustomToken(token)
    .then((user) => {
      // Signed in
      console.log("Signed in successfully");

      console.log("Added", res);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      // log the error to the console
      console.log(errorCode, errorMessage);
    });

  // go into the user tab and create the user
  const res = await db.collection("user").doc(email).set(userData);

  // create user profile
  createUserProfile(db, email);

  // create user in harmony document
  createUserInHarmony(db, email, refreshToken);

  // create and get user stats from Spotify

  // TODO: check what the response is and decide where to go from here

  // log to console the result
}

/**
 * Creates and prepopulates the user's profile
 * @param {*} db reference to the database to add to
 * @param {*} email email of the user
 */
async function createUserProfile(db, email) {
  // create data object to be stored
  const userProfileData = {
    profile_picture: "",
    biography: "",
    profile_url: "",
    select_playlist: [],
    social_media: [],
  };

  // go into the profile tab and create the profile for the user
  const res = await db.collection("profile").doc(email).set(userProfileData);

  // TODO: check what response is and decide where to go from here

  // log to console the result
  console.log("Added", res);
}

/**
 * Index the top 10 artists of a user into Firebase
 * @param {JSON} db firebase database that the data will be stored in
 * @param {String} email user's email will be used as the key for the document
 * @param {JSON} topArtistsAndGenres contains top 10 artists from API call
 */
async function createUserStatsTopArtists(db, email, topArtists) {
  var formatedList = {
    top_artists: [],
  };

  for (var i in topArtists) {
    formatedList["top_artists"].push(topArtists[i]["name"]);
  }

  const document = db.collection("stats").doc(email);
  await document.update({
    top_artists: formatedList["top_artists"],
  });
}

/**
 * Since Spotify is weird and shit, we have to grab top genres from top
 * artists as they are the only object with a genre item.
 * @param {*} db
 * @param {*} email
 * @param {*} topArtists
 */
async function createUserStatsTopGenres(db, email, topArtists) {
  // create a list for genres
  var formattedList = {
    top_genres: [],
  };

  // loop through the artists list and add the genres to the list
  for (var i in topArtists) {
    //formattedList["top_genres"].push(topArtists[i]["genres"]);

    for (var j in topArtists[i]["genres"]) {
      formattedList["top_genres"].push(topArtists[i]["genres"][j]);
      console.log(topArtists[i]["genres"][j]);
    }
  }

  // add it to the database
  const document = db.collection("stats").doc(email);
  await document.update({
    top_genres: formattedList["top_genres"],
  });
}

/**
 * Index the top 10 tracks of a user into Firebase
 * @param {JSON} db firebase database that the data will be stored in
 * @param {String} email user's email will be used as the key for the document
 * @param {JSON} topTracks tracks top 10 artists from API call
 */
async function createUserStatsTopTracks(db, email, topTracks) {
  var formatedList = {
    top_tracks: [],
  };

  for (var i in topTracks) {
    formatedList["top_tracks"].push(topTracks[i]["name"]);
  }

  const document = db.collection("stats").doc(email);
  await document.update({
    top_tracks: formatedList["top_tracks"],
  });
}

/**
 * Creates and populated the user's stats for top 5 stats
 * @param {*} db reference to the database to add to
 * @param {*} email email of the user
 * @param {*} refresh_token Spotify refresh token of the user
 */
async function createUserStats(db, email, access_token, refresh_token) {
  // create an empty stats document for the user
  const statsData = {
    top_artists: [],
    top_tracks: [],
    top_genres: [],
  };
  const res = await db.collection("stats").doc(email).set(statsData);

  // find top artist
  var topArtistsCall = {
    url:
      "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10",
    headers: { Authorization: "Bearer " + access_token },
    json: true,
  };

  request.get(topArtistsCall, function (error, response, topArtists) {
    createUserStatsTopArtists(db, email, topArtists.items);
  });

  // find top genre
  var topGenresCall = {
    url:
      "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50",
    headers: { Authorization: "Bearer" + access_token },
    json: true,
  };
  request.get(topGenresCall, function (error, response, topArtists) {
    createUserStatsTopGenres(db, email, topArtists.items);
  });

  // find top tracks
  var topTracksCall = {
    url:
      "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10",
    headers: { Authorization: "Bearer " + access_token },
    json: true,
  };
  request.get(topTracksCall, function (error, response, topTracks) {
    createUserStatsTopTracks(db, email, topTracks.items);
  });

  console.log("Added", res);
}

/**
 * Creates the user's in harmony list from current
 * @param {*} db
 * @param {*} email
 * @param {*} refresh_token
 */
async function createUserInHarmony(db, email, refresh_token) {
  // TODO: in harmony algorithm - Steven's task

  // Create the in harmony list (empty for now)
  const userInHarmonyData = {
    similar_users: [],
  };

  // go into in harmony tab and create the profile for the user
  const res = await db
    .collection("in_harmony")
    .doc(email)
    .set(userInHarmonyData);

  // Log to console the result
  console.log("Added", res);
}

app.get("/login", function (req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = "user-read-private user-read-email user-top-read";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

app.get("/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        // signed in
        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
          console.log(body);

          var displayName = body["display_name"];
          var userEmail = body["email"];
          var userId = body["id"];

          createUser(fsdb, userEmail, displayName, userId, refresh_token);
          createUserStats(fsdb, userEmail, access_token, refresh_token); // Should this be moved to inside create users then?
          // TODO: how to get top genres??
          // look at this link to get some data info https://sofiya.io/blog/genres
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          "/#" +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      } else {
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
});

app.get("/refresh_token", function (req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});

// the
console.log("Listening on 8888");
app.listen(8888);
