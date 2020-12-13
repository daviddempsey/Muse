/**
 * Muse - Database access methods for in harmony functions
 *
 * This file is to store all the database access methods
 * This will include profile creating and reading, user creating and reading,
 * etc.
 */

// in harmony access functions - POST

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

// in harmony access functions - GET

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


