import firebase from "../firebase";

const db = firebase.collection("/user");

class UserService {
  getAll() {
    return db;
  }

  getUser(email) {
    return db.doc(email);
  }

  getProfilePicture(email) {
    return db.doc(email).get("profile_picture");
  }

  /* SOCIAL MEDIA GET FUNCTIONS */
  getFacebook(email) {
    return db.doc(email).get("facebook");
  }

  getInstagram(email) {
    return db.doc(email).get("instagram");
  }

  getTwitter(email) {
    return db.doc(email).get("twitter");
  }
  getBiography(email){
    return db.doc(email).get("biography");
  }
  getProfileLink(email){
    return db.doc(email).get("profile_picture");
  }

  create(user) {
    return db.add(user);
  }

  update(email, value) {
    return db.doc(email).update(value);
  }

  delete(email) {
    return db.doc(email).delete();
  }
}

export default new UserService();
