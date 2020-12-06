const fetch = require('node-fetch');

/**
 * Computes compatibility of all users within range
 * @param {Firebase} admin admin to do storing
 * @param {Firestore} fsdb Reference to the Firestore database
 * @param {String} currUserId Email of the user used to access info from fsdb
 * @param {Number} distanceLimit Maximum radius users must be within when computing score
 * @param {Firestore} querySnapshot Firestore snapshot used to collect all docs within table
 */
exports.populateLeaderboard = async function (admin, fsdb, currUserId, distanceLimit, querySnapshot) {
    var response = [];

    let currUserLocation = await getLocation(fsdb, currUserId);
    let docs = querySnapshot.docs; // the result of the query

    // Iterate through all the documents
    for (let doc of docs) {
        let otherUserId = doc.data().in_harmony;
        let otherUserLocation = await getLocation(fsdb, otherUserId);
        console.log(currUserLocation.latitude);
        console.log(currUserLocation.longitude);
        let distance = getDistanceFromLatLon(
            currUserLocation.latitude, currUserLocation.longitude,
            otherUserLocation.latitude, otherUserLocation.longitude);

        // Calculate the compatibility score between two users
        if (doc.id != currUserId && distance <= distanceLimit) {
            let otherUserEmail = await doc.data().in_harmony;
            response.push(await computeCompatibility(admin, fsdb, currUserId, otherUserEmail));
        }
    }
    return response;
}

/**
 * Compute the compatibility score between two users (including breakdown of each category)
 * Format Example:
 *     "test1@test.com": {
 *      "audio_features": 0.8694175,
 *      "artist": 0.05999221968262216,
 *      "genres": 0.11401209424476016,
 *      "score": 0.3478072713091274
 *     }
 * @param {Firestore} fsdb Reference to the Firestore database
 * @param {String} currUserEmail ID to obtain info from Firestore
 * @param {String} otherUserEmail ID to obtain info from Firestore
 */
async function computeCompatibility(admin, fsdb, currUserEmail, otherUserEmail) {

  // Get top data by making a Firestore call for current user
  let document = fsdb.collection('stats').doc(currUserEmail);
  let data = await document.get();
  const currUserTopStats = data.data();

  // Get top data by making a Firestore call for other user
  document = fsdb.collection('stats').doc(otherUserEmail);
  data = await document.get();
  const otherUserTopStats = data.data();

  // Get respective scores
  var compatiblityScores = {};
  compatiblityScores[otherUserEmail] = {
    "audio_features": await computeAudioFeatureScore(currUserTopStats.top_tracks, otherUserTopStats.top_tracks),
    "artist": await rbo(currUserTopStats.top_artists, otherUserTopStats.top_artists, "artists"),
    "genres": await rbo(currUserTopStats.top_genres, otherUserTopStats.top_genres, "genres"),
    "score": 0
  }
  // Get average for total compatibility percentage
  compatiblityScores[otherUserEmail]["score"] = (compatiblityScores[otherUserEmail]["audio_features"] +
    compatiblityScores[otherUserEmail]["artist"] + compatiblityScores[otherUserEmail]["genres"]) / 3

  // Put compatibility score inside the in_harmony table on Firestore 
  indexCompatibilityScoresIntoTable(admin, fsdb, currUserEmail, otherUserEmail, compatiblityScores[otherUserEmail]);

  // do we update the other user's in_harmony document as well? 
  //  indexCompatibilityScoresIntoIndex(fsdb, otherUserEmail, currUserEmail, compatiblityScores);


  return JSON.stringify(compatiblityScores);

}


/**
 * Computes the compatibility score based on the top songs listed
 * @param {List} currUserTopSongs top songs of current user
 * @param {List} otherUserTopSongs top songs of other user
 */
async function computeAudioFeatureScore(currUserTopSongs, otherUserTopSongs) {

  // Make array that contains all of the ids
  var currUserTopSongsIds = await getIdsFromTopStats(currUserTopSongs);
  var otherUserTopSongsIds = await getIdsFromTopStats(otherUserTopSongs);

  let token = await APIController.getToken();

  // To prevent UnhandledPromiseRejectionWarning: SyntaxError: Unexpected token o in JSON at position 1
  // I used JSON.stringify
  const currUserAudioFeatures = JSON.stringify(
    await APIController.getAudioFeaturesForSeveralTracks(token, currUserTopSongsIds)
  );
  const otherUserAudioFeatures = JSON.stringify(
    await APIController.getAudioFeaturesForSeveralTracks(token, otherUserTopSongsIds)
  );

  var meansOfAudioFeatures1 = {
    "valence": getMeanOfFeature(currUserAudioFeatures, "valence"),
    "energy": getMeanOfFeature(currUserAudioFeatures, "energy"),
    "danceability": getMeanOfFeature(currUserAudioFeatures, "danceability"),
    "acousticness": getMeanOfFeature(currUserAudioFeatures, "acousticness")
  }

  var meansOfAudioFeatures2 = {
    "valence": getMeanOfFeature(otherUserAudioFeatures, "valence"),
    "energy": getMeanOfFeature(otherUserAudioFeatures, "energy"),
    "danceability": getMeanOfFeature(otherUserAudioFeatures, "danceability"),
    "acousticness": getMeanOfFeature(otherUserAudioFeatures, "acousticness")
  }

  var diff = differenceInMeanOfAudioFeatures(meansOfAudioFeatures1, meansOfAudioFeatures2);
  var score = calculateCompatibilityScore(diff);
  return score;

}

/**
 * Used to compute overall compatibility score for user's top artists or genres
 * @param {List} currList top artists/genres of a user
 * @param {List} otherList top artists/genres of a user
 */
async function rbo(currList, otherList, type) {
  currList = await getNamesFromTopStats(currList, type);
  otherList = await getNamesFromTopStats(otherList, type);

  var jaccards = [];
  var tempCurrList = [];
  var tempOtherList = [];

  // Compute Jaccard similarity in every iteration 
  for (let i = 0; i < currList.length; i++) {
    tempCurrList.push(currList[i]);
    tempOtherList.push(otherList[i]);
    jaccards.push(intersection(tempCurrList, tempOtherList).size / union(tempCurrList, tempOtherList).size);
  }

  // Compute and return average of Jaccard similarity
  var sum = 0;
  for (let i in jaccards) {
    sum += jaccards[i];
  }
  return sum / jaccards.length;

}


/**
 * Calculates the mean of an audio feature contained in a JSON
 * @param {JSON} audioFeatures contains audioFeatures of every song in playlist
 * @param {String} feature the feature we want to take the mean of
 */
function getMeanOfFeature(audioFeatures, feature) {
  audioFeatures = JSON.parse(audioFeatures);
  var sum = 0;
  for (var i = 0; i < audioFeatures.length; i++) {
    sum += audioFeatures[i][feature];
  }
  return sum / audioFeatures.length;
}

/**
 * Calculates the difference in means of every audio feature
 * @param {JSON} means1 contains means of audio features for user1
 * @param {JSON} means2 contains means of audio features for user2
 */
function differenceInMeanOfAudioFeatures(meansOfAudioFeatures1, meansOfAudioFeatures2) {
  var diff = {
    "valenceDiff": Math.abs(meansOfAudioFeatures1["valence"] - meansOfAudioFeatures2["valence"]),
    "energyDiff": Math.abs(meansOfAudioFeatures1["energy"] - meansOfAudioFeatures2["energy"]),
    "danceabilityDiff": Math.abs(meansOfAudioFeatures1["danceability"] - meansOfAudioFeatures2["danceability"]),
    "acousticnessDiff": Math.abs(meansOfAudioFeatures1["acousticness"] - meansOfAudioFeatures2["acousticness"])
  };
  return diff;
}

/**
 * Calculates the average of the difference in audio features, which 
 * represents the compatibility percentage of two users based on 
 * the audio features
 * @param {Object} data contains the difference in audio features
 */
function calculateCompatibilityScore(data) {
  var avg = (data["valenceDiff"] + data["energyDiff"] +
    data["danceabilityDiff"] + data["acousticnessDiff"]) / 4;
  return 1 - avg;
}

/**
 * Finds the union of two sets in O( |currList| + |otherList| )
 * @param {List} currList top artists/genres of a user
 * @param {List} otherList top artists/genres of a user
 */
function union(currList, otherList) {
  const result = new Set();

  currList.forEach(value => {
    result.add(value);
  });

  otherList.forEach(value => {
    result.add(value);
  });

  return result;
}


/**
 * Finds the intersection of two sets in O(currList)
 * @param {List} currList top artists/genres of a user
 * @param {List} otherList top artists/genres of a user
 */
function intersection(currList, otherList) {
  var results = new Set();

  for (var i = 0; i < currList.length; i++)
    if (otherList.indexOf(currList[i]) !== -1) {
      results.add(currList[i]);
    }
  return results;
}

/**
 * Returns array containing the IDS of all entries from top stats
 * @param {Object} doc top stats of a user
 */
async function getIdsFromTopStats(doc) {
  var ids = [];
  for (let i = 1; i < doc.length; i++) {
    ids.push(doc[i].track_id);
  }
  return ids;
}

/**
 * Returns array containing the IDS of all artists/genres from top stats
 * @param {Object} doc top stats of a user
 * @param {String} type returning the artists or the genres
 */
async function getNamesFromTopStats(doc, type) {
  var names = [];
  if (type === "artists") {
    for (let i = 1; i < doc.length; i++) {
      names.push(doc[i].artist_name);
    }
  } else {
    for (let i = 1; i < doc.length; i++) {
      names.push(doc[i].genre_name);
    }
  }
  return names;

}


/**
 * Indexes Compatibility info into the 'in_harmony' table on Firestore
 * The definition of 'sourceUser' and 'targetUser' are switched (probably)
 * @param {Firestore} fsdb Reference to the Firestore database
 * @param {String} sourceUser the document belonging to this user will be updated
 * @param {String} targetUser the document belonging to sourceUser will be updated with targetUser info
 * @param {Object} compatiblityScores contains the breakdown of the compatibility scores
 */
async function indexCompatibilityScoresIntoTable(admin, fsdb, sourceUser, targetUser, compatibilityScores) {
  let document = fsdb.collection('in_harmony').doc(sourceUser);
  let data = await document.get();
  let entry = data.data();

  // TODO: Hey David, should i add the date here so I have record of when this was last updated? 


  /*// Case 1: the document exists but there are no fields inside - add field
  if (entry !== undefined && Object.keys(entry).length === 0) {
    var similarUsers = {};
    similarUsers[targetUser] = compatiblityScores;
    await fsdb.collection('in_harmony').doc(sourceUser)
      .update({
        similar_users: similarUsers
      });
  }

  // Case 2: document exists but new user was calculated - add new user calculations
  else if (entry === undefined || entry['similar_users'][targetUser] === 'undefined') {
    // add to table and then push
    var similarUsers = {};
    similarUsers[targetUser] = compatiblityScores;
    await fsdb.collection('in_harmony').doc(sourceUser)
      .create({
        similar_users: similarUsers
      });
  }

  // Case 3: previously calculated user compatibility - update user compatibility scores
  else {
    entry['similar_users'][targetUser] = compatiblityScores;
    await document.update({
      similar_users: entry['similar_users']
    });
  }*/
  var similarUsers = [];
  var userEntry = {
    'email': targetUser,
    'artist_score': compatibilityScores['artist'],
    'genre_score': compatibilityScores['genres'],
    'audio_feature_score': compatibilityScores['audio_features'],
    'compatibility_score': compatibilityScores['score'],
  }
  similarUsers.push(userEntry);
  await document.update({
    similar_users: admin.firestore.FieldValue.arrayUnion(userEntry)
  });

}


/* Location functions */

/**
 * Gets the latitude and longitude of the user
 * @param {Firestore} fsdb Reference to the Firestore database
 * @param {String} user ID used to obtain data from Firestore
 */
async function getLocation(fsdb, user) {
  const document = fsdb.collection('user').doc(user);
  let profile = await document.get();
  let response = profile.data();
  return response.location;
}

/**
 * Finds the distance in miles given lat and long of two positions
 * Source: https://www.movable-type.co.uk/scripts/latlong.html
 * @param {Number} lat1 Latitude of position 1
 * @param {Number} lon1 Longitude of position 1
 * @param {Number} lat2 Latitude of position 2
 * @param {Number} lon2 Longitude of position 2
 */
function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {

  // Base case: if they don't have a location, don't apply distance filter
  if ((lat1 === undefined && lon1 === undefined) || (lat2 === undefined && lon2 === undefined)) {
    return 0;
  }

  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c * 0.000621371; // in metres
  return d;
}


/**
 * This API controller is used to call Spotify APIs. Most of these
 * functions are not actually used in this file, but will be left 
 * here for reference. 
 */
const clientId = '3068918efe6349bfa18633d5dd854b6a';
const clientSecret = '93f20dfbf9a64d7cbf7f0832e5f0ccf3';

const APIController = (function () {
  const _getToken = async () => {

    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
      },
      body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
  }

  const _getGenres = async (token) => {

    const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data.categories.items;
  }

  const _getPlaylist = async (token, playlistId) => {

    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=US`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data.items;
  }

  const _getTrackIdsFromPlaylist = async (token, playlistId) => {

    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=US`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    const items = data.items;

    // Iterate through playlist's items to return all tracks
    var trackIds = [];
    for (var i = 0; i < items.length; i++) {
      var obj = items[i];
      trackIds[i] = obj.track.id;
    }
    return trackIds;
  }

  const _getAudioFeaturesForSeveralTracks = async (token, trackIds) => {

    const result = await fetch(`https://api.spotify.com/v1/audio-features?ids=${trackIds}`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data.audio_features;
  }

  const _getPlaylistByGenre = async (token, genreId) => {

    const limit = 10;

    const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data.playlists.items;
  }

  const _getTracks = async (token, tracksEndPoint) => {

    const limit = 10;

    const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data.items;
  }

  const _getTrack = async (token, trackEndPoint) => {

    const result = await fetch(`${trackEndPoint}`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data;
  }

  return {
    getToken() {
      return _getToken();
    },
    getGenres(token) {
      return _getGenres(token);
    },
    getPlaylist(token, playlistId) {
      return _getPlaylist(token, playlistId);
    },
    getTrackIdsFromPlaylist(token, playlistId) {
      return _getTrackIdsFromPlaylist(token, playlistId);
    },
    getAudioFeaturesForSeveralTracks(token, trackIds) {
      return _getAudioFeaturesForSeveralTracks(token, trackIds);
    },
    getPlaylistByGenre(token, genreId) {
      return _getPlaylistByGenre(token, genreId);
    },
    getTracks(token, tracksEndPoint) {
      return _getTracks(token, tracksEndPoint);
    },
    getTrack(token, trackEndPoint) {
      return _getTrack(token, trackEndPoint);
    }
  }
})();