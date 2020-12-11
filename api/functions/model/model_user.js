/**
 * Muse - Database access methods for user
 *
 * This file is to store all the database access methods
 * This will include profile creating and reading, user creating and reading,
 * etc.
 */

// user access functions - POST

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
exports.getUserInfo = async function getUserInfo(fsdb, req, res) {
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
exports.getUserSection = async function getUserSection(fsdb, req, res) {
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
