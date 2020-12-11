/**
 * Muse - Database access methods for profile
 *
 * This file is to store all the database access methods
 * This will include profile creating and reading, user creating and reading,
 * etc.
 */

// profile access functions - POST

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

// profile access functions - GET

/**
 * Gets the user's profile
 * @param {*} fsdb reference to the database
 * @param {*} req request of the call
 * @param {*} res response of the call
 */
exports.getUserProfile = async function getUserProfile(fsdb, req, res) {
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
exports.getUserProfileSection = async function getUserProfileSection(fsdb, req, res) {
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