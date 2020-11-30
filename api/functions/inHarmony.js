const fetch = require('node-fetch');
exports.computeCompatibility = async function (fsdb, currUserEmail, otherUserEmail) {

  // Get top data by making a Firestore call for current user
  let document = fsdb.collection('stats').doc(currUserEmail);
  let data = await document.get();
  const currUserTopStats = data.data();

  // Get top data by making a Firestore call for other user
  document = fsdb.collection('stats').doc(otherUserEmail);
  data = await document.get();
  const otherUserTopStats = data.data();

  // Get respective scores
  var compatiblityScores = {
    "audio_features": await computeAudioFeatureScore(currUserTopStats.top_tracks, otherUserTopStats.top_tracks),
    "artist": await rbo(currUserTopStats.top_artists, otherUserTopStats.top_artists, "artists"),
    "genres": await rbo(currUserTopStats.top_genres, otherUserTopStats.top_genres, "genres"),
    "score": 0
  }
  // Get average for total compatibility percentage
  compatiblityScores["score"] = (compatiblityScores["audio_features"] + compatiblityScores["artist"] + compatiblityScores["genres"]) / 3

  // Put compatibility score inside inHarmony
  indexCompatibilityScoresIntoIndex(fsdb, currUserEmail, otherUserEmail, compatiblityScores);


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
  for (let i = 0; i < currList.length; i++) {
    tempCurrList.push(currList[i]);
    tempOtherList.push(otherList[i]);
    jaccards.push(intersection(tempCurrList, tempOtherList).size / union(tempCurrList, tempOtherList).size);
  }

  var sum = 0;
  for (let i in jaccards) {
    sum += jaccards[i];
  }
  return sum / jaccards.length;

}


/* Helper methods */

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

async function getIdsFromTopStats(doc) {
  var ids = [];
  for (let i = 1; i < doc.length; i++) {
    ids.push(doc[i].track_id);
  }
  return ids;
}

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
async function indexCompatibilityScoresIntoIndex(fsdb, sourceUser, targetUser, compatiblityScores) {
  let document = fsdb.collection('in_harmony').doc(sourceUser);
  let data = await document.get();
  let entry = data.data();


  if (entry !== undefined && Object.keys(entry).length === 0) {
    var similarUsers = {};
    similarUsers[targetUser] = compatiblityScores;
    await fsdb.collection('in_harmony').doc(sourceUser)
      .update({
        similar_users: similarUsers
      });
  }


  // This won't work if the document is exists but is empty 
  else if (entry === undefined || entry['similar_users'][targetUser] === 'undefined') {
    // add to table and then push
    /* old version
    var similarUsers = [{
      "user_id": targetUser,
      "compatibility_scores": compatiblityScores
    }]; */
    var similarUsers = {};
    similarUsers[targetUser] = compatiblityScores;
    await fsdb.collection('in_harmony').doc(sourceUser)
      .create({
        similar_users: similarUsers
      });
  }

  else {
    entry['similar_users'][targetUser] = compatiblityScores;
    await document.update({
      similar_users: entry['similar_users']
    });
  }

}



const clientId = '3068918efe6349bfa18633d5dd854b6a';
const clientSecret = '93f20dfbf9a64d7cbf7f0832e5f0ccf3';

/**
 * This API controller is used to call Spotify APIs. Most of these
 * functions are not actually used in this file, but will be left 
 * here for reference. 
 */
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