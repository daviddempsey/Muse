const fetch = require("node-fetch");

/**
 * Computes compatibility of all users within range
 * @param {Firebase} admin admin to do storing
 * @param {Firestore} fsdb Reference to the Firestore database
 * @param {String} currUserId Email of the user used to access info from fsdb
 * @param {Number} distanceLimit Maximum radius users must be within when computing score
 * @param {Firestore} querySnapshot Firestore snapshot used to collect all docs within table
 */
exports.populateLeaderboard = async function (
  admin,
  fsdb,
  currUserId,
  distanceLimit,
  querySnapshot
) {
  var response = [];

  let currUserLocation = await getLocation(fsdb, currUserId);
  let docs = querySnapshot.docs; // the result of the query

  // Iterate through all the documents
  for (let doc of docs) {
    let otherUserId = doc.data().in_harmony;
    let otherUserLocation = await getLocation(fsdb, otherUserId);
    let distance = getDistanceFromLatLon(
      currUserLocation.latitude,
      currUserLocation.longitude,
      otherUserLocation.latitude,
      otherUserLocation.longitude
    );

    // Calculate the compatibility score between two users
    if (doc.id != currUserId && distance <= distanceLimit) {
      let otherUserEmail = await doc.data().in_harmony;
      response.push(
        await computeCompatibility(admin, fsdb, currUserId, otherUserEmail)
      );
    }
  }
  return response;
};

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
async function computeCompatibility(
  admin,
  fsdb,
  currUserEmail,
  otherUserEmail
) {
  // Get top data by making a Firestore call for current user
  let document = fsdb.collection("stats").doc(currUserEmail);
  let data = await document.get();
  const currUserTopStats = data.data();

  // Get top data by making a Firestore call for other user
  document = fsdb.collection("stats").doc(otherUserEmail);
  data = await document.get();
  const otherUserTopStats = data.data();

  // Get respective scores
  var compatiblityScores = {};
  compatiblityScores[otherUserEmail] = {
    audio_feature_score: await computeAudioFeatureScore(
      currUserTopStats.top_tracks,
      otherUserTopStats.top_tracks
    ),
    artist_score: await rbo(
      currUserTopStats.top_artists,
      otherUserTopStats.top_artists,
      "artists"
    ),
    genre_score: await rbo(
      currUserTopStats.top_genres,
      otherUserTopStats.top_genres,
      "genres"
    ),
    compatibility_score: 0,
  };
  // Get average for total compatibility percentage
  compatiblityScores[otherUserEmail]["compatibility_score"] =
    (compatiblityScores[otherUserEmail]["audio_feature_score"] +
      compatiblityScores[otherUserEmail]["artist_score"] +
      compatiblityScores[otherUserEmail]["genre_score"]) /
    3;

  // Put compatibility score inside the in_harmony table on Firestore
  indexCompatibilityScoresIntoTable(
    admin,
    fsdb,
    currUserEmail,
    otherUserEmail,
    compatiblityScores[otherUserEmail]
  );

  return JSON.stringify(compatiblityScores);
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
exports.computeFriendCompatibility = async function (
  fsdb,
  currUserEmail,
  otherUserEmail
) {
  // Get top data by making a Firestore call for current user
  let document = fsdb.collection("stats").doc(currUserEmail);
  let data = await document.get();
  const currUserTopStats = data.data();

  // Get top data by making a Firestore call for other user
  document = fsdb.collection("stats").doc(otherUserEmail);
  data = await document.get();
  const otherUserTopStats = data.data();

  // Get respective scores
  var compatiblityScores = {};
  compatiblityScores[otherUserEmail] = {
    audio_features: await computeAudioFeatureScore(
      currUserTopStats.top_tracks,
      otherUserTopStats.top_tracks
    ),
    artist: await rbo(
      currUserTopStats.top_artists,
      otherUserTopStats.top_artists,
      "artists"
    ),
    genres: await rbo(
      currUserTopStats.top_genres,
      otherUserTopStats.top_genres,
      "genres"
    ),
    score: 0,
  };
  // Get average for total compatibility percentage
  compatiblityScores[otherUserEmail]["score"] =
    (compatiblityScores[otherUserEmail]["audio_features"] +
      compatiblityScores[otherUserEmail]["artist"] +
      compatiblityScores[otherUserEmail]["genres"]) /
    3;

  return compatiblityScores;
};

/**
 * Computes the compatibility score based on the top songs listed
 * TODO: Fix the weighting with Kenny and David
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
    await APIController.getAudioFeaturesForSeveralTracks(
      token,
      currUserTopSongsIds
    )
  );
  const otherUserAudioFeatures = JSON.stringify(
    await APIController.getAudioFeaturesForSeveralTracks(
      token,
      otherUserTopSongsIds
    )
  );

  var meansOfAudioFeatures1 = {
    valence: getMeanOfFeature(currUserAudioFeatures, "valence"),
    energy: getMeanOfFeature(currUserAudioFeatures, "energy"),
    danceability: getMeanOfFeature(currUserAudioFeatures, "danceability"),
    acousticness: getMeanOfFeature(currUserAudioFeatures, "acousticness"),
  };

  var meansOfAudioFeatures2 = {
    valence: getMeanOfFeature(otherUserAudioFeatures, "valence"),
    energy: getMeanOfFeature(otherUserAudioFeatures, "energy"),
    danceability: getMeanOfFeature(otherUserAudioFeatures, "danceability"),
    acousticness: getMeanOfFeature(otherUserAudioFeatures, "acousticness"),
  };

  var diff = differenceInMeanOfAudioFeatures(
    meansOfAudioFeatures1,
    meansOfAudioFeatures2
  );
  var score = calculateAudioFeatureCompatibilityScore(diff);
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

  var jaccards_sum = 0;
  var tempCurrList = [];
  var tempOtherList = [];

  /*
   * This is to fix the length issue (if either user does not meet the top_stats limit)
   * Note: this might ruin the calculations
   */
  var limit = Math.min(currList.length, otherList.length);

  // Compute Jaccard similarity in every iteration
  for (let i = 0; i < limit; i++) {
    tempCurrList.push(currList[i]);
    tempOtherList.push(otherList[i]);
    jaccards_sum +=
      intersection(tempCurrList, tempOtherList).size /
      union(tempCurrList, tempOtherList).size;
  }

  // Compute and return average of Jaccard similarity
  return jaccards_sum / tempCurrList.length;
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
function differenceInMeanOfAudioFeatures(
  meansOfAudioFeatures1,
  meansOfAudioFeatures2
) {
  var diff = {
    valenceDiff: Math.abs(
      meansOfAudioFeatures1["valence"] - meansOfAudioFeatures2["valence"]
    ),
    energyDiff: Math.abs(
      meansOfAudioFeatures1["energy"] - meansOfAudioFeatures2["energy"]
    ),
    danceabilityDiff: Math.abs(
      meansOfAudioFeatures1["danceability"] -
        meansOfAudioFeatures2["danceability"]
    ),
    acousticnessDiff: Math.abs(
      meansOfAudioFeatures1["acousticness"] -
        meansOfAudioFeatures2["acousticness"]
    ),
  };
  return diff;
}

/**
 * Calculates the average of the difference in audio features, which
 * represents the compatibility percentage of two users based on
 * the audio features
 * @param {Object} data contains the difference in audio features
 */
function calculateAudioFeatureCompatibilityScore(data) {
  var avg =
    (data["valenceDiff"] +
      data["energyDiff"] +
      data["danceabilityDiff"] +
      data["acousticnessDiff"]) /
    4;
  return 1 - avg;
}

/**
 * Finds the union of two sets in O( |currList| + |otherList| )
 * @param {List} currList top artists/genres of a user
 * @param {List} otherList top artists/genres of a user
 */
function union(currList, otherList) {
  const result = new Set();

  currList.forEach((value) => {
    result.add(value);
  });

  otherList.forEach((value) => {
    result.add(value);
  });

  return result;
}

/**
 * Finds the intersection of two sets in O(|currList|)
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
  for (let i in doc) {
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
    for (let i in doc) {
      names.push(doc[i].artist_name);
    }
  } else {
    for (let i in doc) {
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
async function indexCompatibilityScoresIntoTable(
  admin,
  fsdb,
  sourceUser,
  targetUser,
  compatibilityScores
) {
  let document = fsdb.collection("in_harmony").doc(sourceUser);
  let data = await document.get();
  let entry = data.data();

  // Prepare in_harmony scores to be pushed into Firestore
  var similarUsers = [];
  var userEntry = {
    email: targetUser,
    artist_score: compatibilityScores["artist_score"],
    genre_score: compatibilityScores["genre_score"],
    audio_feature_score: compatibilityScores["audio_feature_score"],
    compatibility_score: compatibilityScores["compatibility_score"],
  };
  similarUsers.push(userEntry);

  // Create new in_harmony document for user when not found (usually for dev testing purposes)
  if (entry === undefined) {
    await fsdb.collection("in_harmony").doc(sourceUser).create({
      similar_users: similarUsers,
    });
  } else {
    await document.update({
      similar_users: admin.firestore.FieldValue.arrayUnion(userEntry),
    });
  }
}

/* Location functions */

/**
 * Gets the latitude and longitude of the user
 * @param {Firestore} fsdb Reference to the Firestore database
 * @param {String} user ID used to obtain data from Firestore
 */
async function getLocation(fsdb, user) {
  const document = fsdb.collection("user").doc(user);
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
  if (
    (lat1 === undefined && lon1 === undefined) ||
    (lat2 === undefined && lon2 === undefined)
  ) {
    return 0;
  }

  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c * 0.000621371; // in metres
  return d;
}

/**
 * Find the similar artist between two lists in O(nlogn)
 * @param {Array} list1 top artist of current user
 * @param {Array} list2 top artist of other user
 */
exports.findTopSimilarArtist = function (list1, list2) {
  // Inverse the enumerated list1
  var inverseList1 = {};
  for (let i in list1) {
    inverseList1[list1[i]["artist_name"]] = i;
  }

  // Match invertedList1 with list2
  var result = {};
  for (let i in list2) {
    let element = list2[i]["artist_name"];
    if (inverseList1[element] !== undefined) {
      result[i] = inverseList1[element];
    }
  }

  var similarities = [];
  for (let i in result) {
    let currRank = parseInt(result[i]);
    let otherRank = parseInt(i);
    let avg_ranking = (currRank + otherRank) / 2;

    // within every entry, you need to put the artist_id (find in database)
    let entry = {
      avg_ranking: avg_ranking,
      name: list2[i]["artist_name"],
      id: list2[i]["artist_id"],
    };
    similarities.push(entry);
  }

  // Sorts list based on avg_ranking then name
  similarities.sort((a, b) =>
    a.avg_ranking > b.avg_ranking
      ? 1
      : a.avg_ranking === b.avg_ranking
      ? a.name > b.name
        ? 1
        : -1
      : -1
  );

  return similarities;
};

/**
 * Find the similar genre between two lists in O(nlogn)
 * also known as genre breakdown
 * @param {Array} list1 top genre of current user
 * @param {Array} list2 top genre of other user
 */
exports.findTopSimilarGenres = function (list1, list2) {
  // Inverse the enumerated list1
  var inverseList1 = {};
  for (let i in list1) {
    inverseList1[list1[i]["genre_name"]] = i;
  }

  // Match invertedList1 with list2
  var result = {};
  for (let i in list2) {
    let element = list2[i]["genre_name"];
    if (inverseList1[element] !== undefined) {
      result[i] = inverseList1[element];
    }
  }

  // Take the average of the frequencies in both lists
  var similarities = [];
  var totalGenreFrequency = 0;
  for (let i in result) {
    let currFrequency = parseInt(list1[i]["frequency"]);
    let otherFrequency = parseInt(list2[i]["frequency"]);
    let entry = {
      name: list2[i]["genre_name"],
      frequency_avg: (currFrequency + otherFrequency) / 2,
    };

    totalGenreFrequency += entry["frequency_avg"];
    similarities.push(entry);
  }

  // Sorts list based on frequency_avg then name
  similarities.sort((a, b) =>
    a.frequency_avg < b.frequency_avg
      ? 1
      : a.frequency_avg === b.frequency_avg
      ? a.name < b.name
        ? 1
        : -1
      : -1
  );

  // Find the overall percentage of each simimlar genre
  for (let i in similarities) {
    similarities[i]["score"] =
      similarities[i]["frequency_avg"] / totalGenreFrequency;
  }

  return similarities;
};

/**
 * This API controller is used to call Spotify APIs. Most of these
 * functions are not actually used in this file, but will be left
 * here for reference.
 */
const clientId = "3068918efe6349bfa18633d5dd854b6a";
const clientSecret = "93f20dfbf9a64d7cbf7f0832e5f0ccf3";

const APIController = (function () {
  const _getToken = async () => {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
      body: "grant_type=client_credentials",
    });

    const data = await result.json();
    return data.access_token;
  };

  const _getGenres = async (token) => {
    const result = await fetch(
      `https://api.spotify.com/v1/browse/categories?locale=sv_US`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    const data = await result.json();
    return data.categories.items;
  };

  const _getPlaylist = async (token, playlistId) => {
    const result = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=US`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    const data = await result.json();
    return data.items;
  };

  const _getTrackIdsFromPlaylist = async (token, playlistId) => {
    const result = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=US`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    const data = await result.json();
    const items = data.items;

    // Iterate through playlist's items to return all tracks
    var trackIds = [];
    for (var i = 0; i < items.length; i++) {
      var obj = items[i];
      trackIds[i] = obj.track.id;
    }
    return trackIds;
  };

  const _getAudioFeaturesForSeveralTracks = async (token, trackIds) => {
    const result = await fetch(
      `https://api.spotify.com/v1/audio-features?ids=${trackIds}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    const data = await result.json();
    return data.audio_features;
  };

  const _getPlaylistByGenre = async (token, genreId) => {
    const limit = 10;

    const result = await fetch(
      `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    const data = await result.json();
    return data.playlists.items;
  };

  const _getTracks = async (token, tracksEndPoint) => {
    const limit = 10;

    const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    const data = await result.json();
    return data.items;
  };

  const _getTrack = async (token, trackEndPoint) => {
    const result = await fetch(`${trackEndPoint}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    const data = await result.json();
    return data;
  };

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
    },
  };
})();
