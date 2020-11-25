var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var data_access = require('./data_access'); // the database access functions

var client_id = '3068918efe6349bfa18633d5dd854b6a'; // Your client id
var client_secret = '93f20dfbf9a64d7cbf7f0832e5f0ccf3'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

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
  measurementId: "G-3D6DCMR4W7"
});

const debug = require('debug')('firestore-snippets-node'); // firebase debug
const admin = require('firebase-admin'); // firebase admin account

var serviceAccount = require("../permissions.json"); // service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://muse-eec76.firebaseio.com"
});

const app = express();
const fsdb = admin.firestore();

// create cores 
const cors = require('cors');
app.use( cors({origin: true}));

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

app.use(express.static(__dirname + './../public'))
   .use(cors())
   .use(cookieParser());

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-top-read';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

// callback once you reach finish logging in and you get the information 
app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;
          
        // signed in
        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);

          var displayName = body['display_name'];
          var userEmail = body['email'];
          var userId = body['id']; 
          var imageUrl = body['images'][0]['url'];
          var spotifyUrl = body['external_urls']['spotify'];

          data_access.createUser(firebase, admin, fsdb, userEmail, displayName, userId, imageUrl, spotifyUrl, refresh_token);
          data_access.createUserStats(fsdb, userEmail, access_token, refresh_token); // Should this be moved to inside create users then? 
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));

        
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

console.log('Listening on 8888');
app.listen(8888);
