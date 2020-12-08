// references to firebase functions
const functions = require('firebase-functions');

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var data_access = require('./data_access'); // the database access functions
var in_harmony = require('./in_harmony'); // the in harmony functions

var client_id = 'd81dc76912324d4085250cc20a84ebeb'; // Your client id
var client_secret = '9160d378ee03457dbb3d30a54e79d6ab'; // Your secret
var redirect_uri = 'http://localhost:5001/muse-eec76/us-central1/app/callback'; // Your redirect uri

const debug = require('debug')('firestore-snippets-node'); // firebase debug
const admin = require('firebase-admin'); // firebase admin account

var serviceAccount = require('./service_account_keys'); // service account
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'muse-eec76',
    databaseURL: 'https://muse-eec76.firebaseio.com',
});

const app = express();
const fsdb = admin.firestore();

// create cores
const cors = require('cors');

var stateKey = 'spotify_auth_state';

app
    .use(express.static(__dirname + './../public'))
    .use(
        cors({
            allowedHeaders: ['Content-Type'],
            origin: '*',
            preflightContinue: true,
        })
    )
    .use(cookieParser());

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
    var text = '';
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

// Routes
app.get('/', (req, res) => {
    return res.status(200).send('We did it!');
});

// Create, POST
// Go through every user in our database and compute compatibility score

app.post("/api/in_harmony/:currUserId/:distanceLimit", (req, res) => {
    (async () => {
        try {
            var query = fsdb.collection('user');
            var reset = {
                similar_users: []
            };

            // delete document first
            await fsdb.collection("in_harmony").doc(req.params.currUserId).set(reset);

            var querySnapshot = await query.get();
                    
            await in_harmony.populateLeaderboard(admin, fsdb, req.params.currUserId, req.params.distanceLimit, querySnapshot);

            return res.status(200).send();

        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// Read, GET
app.options('/login', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.end();
});

app.get('/login', function(req, res) {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope = 'user-read-private user-read-email user-top-read';
    res.redirect(
        'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state,
        })
    );
});

// callback once you reach finish logging in and you get the information
app.get('/callback', function(req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect(
            '/#' +
            querystring.stringify({
                error: 'state_mismatch',
            })
        );
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code',
            },
            headers: {
                Authorization: 'Basic ' +
                    new Buffer.from(client_id + ':' + client_secret).toString('base64'),
            },
            json: true,
        };

        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                // signed in
                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { Authorization: 'Bearer ' + access_token },
                    json: true,
                };

                // use the access token to access the Spotify Web API
                request.get(options, function(error, response, body) {
                    var displayName = body['display_name'];
                    var userEmail = body['email'];
                    var userId = body['id'];
                    var imageUrl = '';
                    try {
                        imageUrl = body['images'][0]['url'];
                    } catch (error) {
                        imageUrl = '';
                    }

                    var spotifyUrl = body['external_urls']['spotify'];

                    // create the user and create their stats
                    data_access.createUserStats(
                        fsdb,
                        userEmail,
                        access_token,
                        refresh_token
                    ); // dunno if the order matters
                    var firebaseToken = data_access
                        .createUser(
                            admin,
                            fsdb,
                            userEmail,
                            displayName,
                            userId,
                            imageUrl,
                            spotifyUrl,
                            refresh_token
                        )
                        .then(
                            (value) =>
                            res
                            .cookie('token', value)
                            .redirect('http://localhost:3000/logging'),
                            (e) => console.log(e)
                        );
                });
            } else {
                // if the token that comes back is invalid
                res.redirect(
                    '/#' +
                    querystring.stringify({
                        error: 'invalid_token',
                    })
                );
            }
        });
    }
});

app.get('/refresh_token', function(req, res) {
    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            Authorization: 'Basic ' +
              new Buffer.from(client_id + ':' + client_secret).toString('base64'),
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
        },
        json: true,
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                access_token: access_token,
            });
        }
    });
});

app.get('/api/user/profile/:id', (req, res) => {
    (async() => {
        try {
            // try getting the information from the database
            const document = fsdb.collection('profile').doc(req.params.id);
            let product = await document.get();
            let response = product.data();

            // send product data to front end
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

app.get('/api/user/profile/:section/:id', (req, res) => {
    (async() => {
        try {
            // try getting the information from the database
            const document = fsdb.collection('profile').doc(req.params.id);
            let profile = await document.get();
            let response = profile.data()[req.params.section];

            // send product data to front end
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

app.get('/api/user/profile/social/:site/:id', (req, res) => {
    (async() => {
        try {
            // try getting the information from the database
            const document = fsdb.collection('profile').doc(req.params.id);
            let product = await document.get();
            let response = product.data()['social_media'][req.params.id];
            console.log(response);

            // send product data to front end
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

app.get('/api/user/stats/:id', (req, res) => {
    (async() => {
        try {
            // try getting the information from the database
            const document = fsdb.collection('stats').doc(req.params.id);
            let profile = await document.get();
            let response = profile.data();

            // send product data to front end
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

app.get('/api/user/stats/:section/:id', (req, res) => {
    (async() => {
        try {
            // try getting the information from the database
            const document = fsdb.collection('stats').doc(req.params.id);
            let profile = await document.get();
            let response = profile.data()[req.params.section];

            // send product data to front end
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

app.options('/api/in_harmony/:id', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.end();
});

// Get In-Harmony Data from Firestore 
app.get("/api/in_harmony/:id", (req, res) => {
    (async() => {
        try {
            // try getting the information from the database
            const document = fsdb.collection('in_harmony').doc(req.params.id);
            let profile = await document.get();
            let response = profile.data();

            // send product data to front end
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
})

// Get top artists between two users
app.get("/api/in_harmony/compare/similar/artists/:currUser/:otherUser", (req, res) => {
    (async() => {
        try {
            // Get top stats of current user
            const document1 = fsdb.collection('stats').doc(req.params.currUser);
            let profile1 = await document1.get();
            let response1 = profile1.data();
            
            // Get top stats of other user
            const document2 = fsdb.collection('stats').doc(req.params.otherUser);
            let profile2 = await document2.get();
            let response2 = profile2.data();

            // Find similarities
            var topSimilar = in_harmony.findTopSimilarArtist( response1.top_artists, response2.top_artists );

            // send product data to front end
            return res.status(200).send(topSimilar);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
})


// Get top genres between two users
app.get("/api/in_harmony/compare/similar/genres/:currUser/:otherUser", (req, res) => {
    (async() => {
        try {
            // Get top stats of current user
            const document1 = fsdb.collection('stats').doc(req.params.currUser);
            let profile1 = await document1.get();
            let response1 = profile1.data();
            
            // Get top stats of other user
            const document2 = fsdb.collection('stats').doc(req.params.otherUser);
            let profile2 = await document2.get();
            let response2 = profile2.data();

            // Find similarities
            var topSimilar = in_harmony.findTopSimilarGenres( response1.top_genres, response2.top_genres );

            // send product data to front end
            return res.status(200).send(topSimilar);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
})

// Get comparison between two users
app.get("/api/in_harmony/compareFriends/:currUserEmail/:friendUserEmail", (req, res) => {
    (async() => {
        try {
            // get the compatibility of 2 friends
            var comparison = await in_harmony.computeFriendCompatibility(fsdb, req.params.currUserEmail, req.params.friendUserEmail);

            // send compatibility data to front end
            return res.status(200).send(comparison[req.params.friendUserEmail]);
        } catch (error) {
            // if error is caught, send 500 and return error message
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});


// Update, PUT

// Delete, DELETE

// app.listen(3000, function () {
//   console.log('CORS-enabled web server listening on port 3000')
// })

// call function whenever there's a new request
// export api to Firebase cloud functions
exports.app = functions.https.onRequest(app);