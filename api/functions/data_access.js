/**
 * Muse - Database access methods
 *
 * This file is to store all the database access methods
 * This will include profile creating and reading, user creating and reading,
 * etc.
 */

var request = require("request"); // "Request" library

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
exports.createUser = async function createUser(
  admin,
  db,
  userEmail,
  displayName,
  spotifyID,
  profilePicture,
  acctUrl,
  refreshToken
) {
  // create a data document to be stored
  const userData = {
    name: displayName,
    spotify_id: spotifyID,
    refresh_token: refreshToken,
    location: [],
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
    profile_url: "",
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
 * Index the top 10 artists of a user into Firebase
 * @param {JSON} db firebase database that the data will be stored in
 * @param {String} email user's email will be used as the key for the document
 * @param {JSON} topArtists contains top 10 artists from API call
 */
async function createUserStatsTopArtists(db, email, topArtists) {
  // list to be added for top artists
  var formattedList = {
    top_artists: [],
  };

  // go through and add each artist
  for (var i in topArtists) {
    // Get image urls
    var image_urls = [];
    for (var j in topArtists[i]["images"]) {
      image_urls.push(topArtists[i]["images"][j]["url"]);
    }

    var entry = {
      rank: +i + +1,
      track_name: topArtists[i]["name"],
      track_id: topArtists[i]["id"],
      images: image_urls,
    };
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
    top_genres: [],
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
    var entry = {
      rank: +index + +1,
      genre_name: key,
    };
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
    top_tracks: [],
  };

  // go through each track and fill in the entries
  for (var i in topTracks) {
    // Get image urls
    var image_urls = [];
    for (var j in topTracks[i]["album"]["images"]) {
      image_urls.push(topTracks[i]["album"]["images"][j]["url"]);
    }

    var entry = {
      rank: +i + +1,
      track_name: topTracks[i]["name"],
      track_id: topTracks[i]["id"],
      images: image_urls,
    };
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
 * @param {*} refresh_token Spotify refresh token of the user
 */
exports.createUserStats = async function createUserStats(
  db,
  email,
  access_token,
  refresh_token
) {
  // create an empty stats document for the user
  const statsData = {
    song_stats: "",
    albums: "",
    artist_stats: "",
    playlist_stats: "",
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

  // find top genre (Do we really want it long term 50 since we have medium_term 10 for all the other calls)
  var topGenresCall = {
    url:
      "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10",
    headers: { Authorization: "Bearer " + access_token },
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
