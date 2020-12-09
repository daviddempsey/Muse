/**
 * Muse - Database access methods
 *
 * This file is to store all the database access methods
 * This will include profile creating and reading, user creating and reading,
 * etc.
 */
var request = require("request"); // "Request" library

// Change this number to get more accurate results when computing compatibility
const TOP_STATS_LIMIT = 10;

/**
 * Creates a user based on the user's Spotify information into the database
 * that's passed in.
 *
 * @param {*} admin reference to admin for database access
 * @param {*} db reference to the database to add to
 * @param {*} email email of the user
 * @param {*} displayName name of the user
 * @param {*} spotifyID Spotify ID of the user
 * @param {*} profilePicture Link to profile picture on spotify
 * @param {*} acctUrl link to user's spotify profile
 * @param {*} refreshToken Spotify refresh token of the user
 */
exports.createUser = async function createUser(
  admin,
  db,
  userEmail,
  displayName,
  spotifyID,
  profilePicture,
  acctUrl,
  refreshToken) {

  // create a data document to be stored 
  const userData = {
    name: displayName,
    spotify_id: spotifyID,
    refresh_token: refreshToken,
    location: {},
    profile: userEmail,
    friends: [],
    messages: [],
    stats_id: userEmail,
    in_harmony: userEmail,
  };

  // try creating user
  try {
    await admin.auth().updateUser(spotifyID, {
      displayName: displayName,
      email: userEmail,
    });
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      let response = await admin.auth().createUser({
        uid: spotifyID,
        displayName: displayName,
        refreshToken: refreshToken,
        email: userEmail,
      });
      console.log("Successfully created new user with email: ", response.email);

      // go into the user tab and create the user
      await db.collection("user").doc(userEmail).set(userData);

      // create user profile
      await createUserProfile(db, userEmail, profilePicture, acctUrl);

      // create user in harmony document
      await createUserInHarmony(db, userEmail, refreshToken);
    }
  }

  // create a custom auth token and if user already exists, query for custom token
  // surround a try catch block, and handle it with
  const token = await admin.auth().createCustomToken(spotifyID);
  console.log("Created custom token for UID", spotifyID, "Token:", token);

  return token;
};

/**
 * Creates and prepopulates the user's profile
 * @param {*} db reference to the database to add to
 * @param {*} email email of the user
 * @param {*} profilePicture the profile picture url of current user
 * @param {*} acctUrl the spotify link of the user 
 */
async function createUserProfile(db, email, profilePicture, acctUrl) {
  // create empty social media object
  const userSocialMedia = {
    facebook: "",
    instagram: "",
    twitter: "",
    tiktok: "",
    spotify: acctUrl,
  };

  // create data object to be stored
  const userProfileData = {
    biography: "",
    profile_url: new Buffer.from(email).toString("base64"),
    profile_picture: profilePicture,
    select_playlist: [],
    social_media: userSocialMedia,
  };

  // go into the profile tab and create the profile for the user
  const res = await db.collection("profile").doc(email).set(userProfileData);

  // log to console the result
  return res;
}

/**
 * Updates user playlists upon.
 * @param {*} db
 * @param {*} email
 * @param {*} playlists
 */
async function updateUserPlaylists(db, email, playlists) {
  // create data object to be stored
  var formattedList = {
    public_playlists: [],
  };

  for (var i in playlists) {
    // Get image URL
    var image_url = playlists[i]["images"][0]["url"];

    // get playlist name
    var playlist_name = playlists[i]["name"];

    // playlist link
    var playlist_id = playlists[i]["id"];

    // entry
    var entry = {
      image: image_url,
      playlist_name: playlist_name,
      playlist_id: playlist_id,
    };

    // push it into formatted list
    formattedList["public_playlists"].push(entry);
  }

  // add populated list to database
  const document = db.collection("stats").doc(email);
  await document.update({
    public_playlists: formattedList["public_playlists"],
  });
}

/**
 * Index the top 10 artists of a user into Firebase
 * @param {JSON} db firebase database that the data will be stored in
 * @param {String} email user's email will be used as the key for the document
 * @param {JSON} topArtists contains top 10 artists from API call
 */
async function createUserStatsTopArtists(db, email, topArtists) {
  // list to be added for top artists
  var formattedList = {
    "top_artists": []
  };

  // go through and add each artist 
  for (var i in topArtists) {

    // Get image urls
    var image_urls = [];
    for (var j in topArtists[i]["images"]) {
      image_urls.push(topArtists[i]["images"][j]["url"]);
    }

    var entry = {
      "rank": (+i + +1),
      "artist_name": topArtists[i]["name"],
      "artist_id": topArtists[i]["id"],
      "images": image_urls
    }
    formattedList["top_artists"].push(entry);
  }

  // add populated list into database
  const document = db.collection("stats").doc(email);
  await document.update({
    top_artists: formattedList["top_artists"],
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
    "top_genres": []
  };

  // Map to store all genres and their frequencies
  let genreRankings = new Map();

  // loop through the artists list and add the genres to the list 
  for (let i in topArtists) {
    for (let j in topArtists[i]["genres"]) {
      // Append genre to Map<genre_name, int> and update frequency
      let genre = topArtists[i]["genres"][j];
      if (genreRankings.has(genre)) {
        genreRankings.set(genre, +genreRankings.get(genre) + +1);
      } else {
        genreRankings.set(genre, 1);
      }
    }
  }

  // Sort map
  genreRankings = new Map(
    [...genreRankings.entries()].sort((a, b) => b[1] - a[1])
  );

  // Format data to be indexed into Firestore 'stats' as a new or updated document
  let index = 0;
  for (const [key, value] of genreRankings.entries()) {
    // Limit the results to only 10
    if (index === TOP_STATS_LIMIT) {
      break;
    }

    var entry = {
      "rank": (+index + +1),
      "genre_name": key,
      "frequency": genreRankings.get(key)
    }
    formattedList["top_genres"].push(entry);
    index++;
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
 * @param {JSON} topTracks top 10 tracks from API call
 */
async function createUserStatsTopTracks(db, email, topTracks) {
  // list to be added
  var formattedList = {
    "top_tracks": []
  };

  // go through each track and fill in the entries
  for (var i in topTracks) {
    // Get image urls
    var image_urls = [];
    for (var j in topTracks[i]["album"]["images"]) {
      image_urls.push(topTracks[i]["album"]["images"][j]["url"]);
    }

    // Get artists
    var artistsOfTrack = [];
    for (var j in topTracks[i]["album"]["artists"]) {
      artistsOfTrack.push(topTracks[i]["album"]["artists"][j]["name"]);
    }

    var entry = {
      "rank": (+i + +1),
      "track_name": topTracks[i]["name"],
      "track_id": topTracks[i]["id"],
      "images": image_urls,
      "artists": artistsOfTrack,
      "album_name": topTracks[i]["album"]["name"]
    }

    // Get artists
    var artistsOfTrack = [];
    for (var j in topTracks[i]["album"]["artists"]) {
      artistsOfTrack.push(topTracks[i]["album"]["artists"][j]["name"]);
    }

    formattedList["top_tracks"].push(entry);
  }

  // add information to document
  const document = db.collection("stats").doc(email);
  await document.update({
    top_tracks: formattedList["top_tracks"],
  });
}

/**
 * Creates and populated the user's stats for top 5 stats
 * @param {*} db reference to the database to add to
 * @param {*} email email of the user
 * @param {*} access_token Spotify access token of the user
 * @param {*} refresh_token Spotify refresh token of the user
 */
exports.createUserStats = async function createUserStats(
  db,
  email,
  access_token,
  refresh_token) {

  // create an empty stats document for the user
  const statsData = {
    song_stats: '',
    albums: '',
    artist_stats: '',
    playlist_stats: '',
    top_artists: [],
    top_tracks: [],
    top_genres: []
  }
  const res = await db.collection('stats').doc(email).set(statsData);

  // find top artist
  var topArtistsCall = {
    url: 'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=' + TOP_STATS_LIMIT,
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true
  };

  request.get(topArtistsCall, function (error, response, topArtists) {
    createUserStatsTopArtists(db, email, topArtists.items);
  });

  // find top genre (Do we really want it long term 50 since we have medium_term 10 for all the other calls)
  var topGenresCall = {
    url: 'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit='+ TOP_STATS_LIMIT,
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true
  };
  request.get(topGenresCall, function (error, response, topArtists) {
    createUserStatsTopGenres(db, email, topArtists.items);
  });

  // find top tracks
  var topTracksCall = {
    url: 'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit='+ TOP_STATS_LIMIT,
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true
  };
  request.get(topTracksCall, function (error, response, topTracks) {
    createUserStatsTopTracks(db, email, topTracks.items);
  });

  var userPlaylistCall = {
    url: "https://api.spotify.com/v1/me/playlists",
    headers: { Authorization: "Bearer " + access_token },
    json: true,
  };
  request.get(userPlaylistCall, function (error, response, playlists) {
    updateUserPlaylists(db, email, playlists.items);
  });

  console.log("Added", res);
};

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


// user access functions - POST
/**
 * Gets the profile section specifed
 * @param {*} fsdb reference to database
 * @param {*} req the request from the call
 * @param {*} res the response of the call
 */
exports.setProfileSection = async function setProfileSection(fsdb, req, res) {
  try {

    // get the document to be changed
    const profileDoc = fsdb.collection("profile").doc(req.params.email);

    // update the document with the request's body
    await profileDoc.update(req.body);

    // send a response if it's successful
    return res.status(200).send();
  } catch (error) {

    // was not able to add the biography due to an error
    console.log(error);

    // return a 500 response due to error
    return res.status(500).send(error);
  }
}

/**
 * Adds friend to current user's list
 * @param {*} admin reference to the admin to access database
 * @param {*} fsdb reference to the database
 * @param {*} req the request from the call
 * @param {*} res the response of the call
 */
exports.addFriend = async function addFriend(admin, fsdb, req, res) {
  try {
            
    // get the current user's user document
    const userDoc = fsdb.collection("user").doc(req.params.currentEmail);
    await userDoc.update({
        friends: admin.firestore.FieldValue.arrayUnion(req.params.otherEmail)
    });

    return res.status(200).send();
    // update the user's list by adding the 
  } catch (error) {

    // was not able to add a friend due to an error
    console.log(error);

    // return a 500 response due to error
    return res.status(500).send(error);
  }
}

/**
 * Removes a friend from the current user's list
 * @param {*} admin reference to the admin to access database
 * @param {*} fsdb reference to the database
 * @param {*} req the request from the call
 * @param {*} res the response of the call
 */
exports.removeFriend = async function removeFriend(admin, fsdb, req, res) {
  try {
            
    // get the current user's user document
    const userDoc = fsdb.collection("user").doc(req.params.currentEmail);
    await userDoc.update({
        friends: admin.firestore.FieldValue.arrayRemove(req.params.otherEmail)
    });

    return res.status(200).send();
    // update the user's list by adding the 
  } catch (error) {

    // was not able to remove friend due to an error
    console.log(error);

    // return a 500 response due to error
    return res.status(500).send(error);
  }
}

/**
 * Sets the in harmony for the users
 * @param {*} in_harmony reference to the file for in harmony functions
 * @param {*} admin reference to admin object to access database
 * @param {*} fsdb reference to the database
 * @param {*} req the request of the call
 * @param {*} res the response of the call
 */
exports.setCompatibility = async function setCompatibility(in_harmony, admin, fsdb, req, res) {
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
}


// user access functions - GET
/**
 * Gets all users in the users list
 * @param {*} fsdb reference to the database 
 * @param {*} req the request from the call
 * @param {*} res the response of the call
 */
exports.getAllUsers = async function getAllUsers(fsdb, req, res) {
  try {

    // get all of the users documents
    const userDoc = await fsdb.collection('user');
    const users = await userDoc.get();

    return res.status(200).send(users.data());
  } catch (error) {

    // unable to receive data from database, log and return error code
    console.log(error);
    return res.status(500).send(error);

  }
}

/**
 * Gets the user document of desire user
 * @param {*} fsdb reference to the database
 * @param {*} req the request from the call
 * @param {*} res the response of the call
 */
exports.userInfo = async function userInfo(fsdb, req, res) {
  try {

      // get all of the users documents
      const userDoc = await fsdb.collection('user').doc(req.params.email);
      const user = await userDoc.get();
      const data = user.data()

      return res.status(200).send(data);
  } catch (error) {

      // unable to receive data from database, log and return error code
      console.log(error);
      return res.status(500).send(error);

  }
}

/**
 * Gets the desired section from user document of desired user
 * @param {*} fsdb reference to the database
 * @param {*} req request from the call
 * @param {*} res response of the call
 */
exports.userSection = async function userSection(fsdb, req, res) {
  try {
            
    // get the section from the user document from database
    const userDoc = await fsdb.collection('user').doc(req.params.email);
    const user = await userDoc.get();
    const data = user.data()[req.params.section];
    

    // send the user section data back
    return res.status(200).send(data);
  } catch (error) {

    // unable to receive data from database, log and return error code
    console.log(error);
    return res.status(500).send(error);
  }
}

/**
 * Gets the user's profile
 * @param {*} fsdb reference to the database
 * @param {*} req request of the call
 * @param {*} res response of the call
 */
exports.userProfile = async function userProfile(fsdb, req, res) {
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
}

/**
 * Gets the specified section of the user's profile
 * @param {*} fsdb reference to the database
 * @param {*} req request of the call
 * @param {*} res response of the call
 */
exports.userProfileSection = async function userProfileSection(fsdb, req, res) {
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
}

/**
 * Gets the social media of the user
 * @param {*} fsdb reference to the database
 * @param {*} req request from the call
 * @param {*} res response of the call
 */
exports.getSocial = async function getSocial(fsdb, req, res) {
  try {
    // try getting the information from the database
    const document = fsdb.collection('profile').doc(req.params.id);
    let product = await document.get();
    let response = product.data()['social_media'][req.params.site];
    console.log(response);

    // send product data to front end
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

/**
 * Gets all user stats
 * @param {*} fsdb reference to the database
 * @param {*} req request from the call
 * @param {*} res response from the call
 */
exports.getAllUserStats = async function getAllUserStats(fsdb, req, res) {
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
}

/**
 * Get specified section of user's stats
 * @param {*} fsdb reference to database
 * @param {*} req request from the call
 * @param {*} res response of the call
 */
exports.getUserStatSection = async function getUserStatSection(fsdb, req, res) {
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
}

/**
 * Gets the user's in harmony list
 * @param {*} fsdb reference to the database
 * @param {*} req request from the call
 * @param {*} res response of the call
 */
exports.getInHarmonyList = async function getInHarmonyList(fsdb, req, res) {
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
}

/**
 * Gets the top artists between 2 users
 * @param {*} in_harmony reference to in harmony functions
 * @param {*} fsdb reference to database
 * @param {*} req request from the call
 * @param {*} res response of the call
 */
exports.getTopArtistTwoUsers = async function getTopArtistTwoUsers(in_harmony, fsdb, req, res) {
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
}

/**
 * Gets the top genres between 2 users
 * @param {*} in_harmony reference to in harmony functions
 * @param {*} fsdb reference to database
 * @param {*} req request from the call
 * @param {*} res response of the call
 */
exports.getTopGenresTwoUsers = async function getTopGenresTwoUsers(in_harmony, fsdb, req, res) {
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
}

/**
 * Gets in harmony comparison between 2 users
 * @param {*} in_harmony reference to in harmony functions
 * @param {*} fsdb reference to database
 * @param {*} req request from the call
 * @param {*} res response of the call
 */
exports.getComparisonsTwoUsers = async function getComparisonsTwoUsers(in_harmony, fsdb, req, res) {
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
}