import firebase from "firebase";

const db = firebase.firestore();
const userCollection = db.collection("user");

class UserService {
  getAll() {
    return userCollection.get();
  }

  getUser(email) {
    return userCollection.doc(email);
  }

  getProfilePicture(email) {
    return userCollection.doc(email)["profile_url"];
  }

  /* SOCIAL MEDIA GET FUNCTIONS */
  getFacebook(email) {
    return userCollection.doc(email)["facebook"];
  }

  getInstagram(email) {
    return userCollection.doc(email)["instagram"];
  }

  getTwitter(email) {
    return userCollection.doc(email)["twitter"];
  }

  getTikTok(email) {
    return userCollection.doc(email)["tiktok"];
  }

  getSpotify(email) {
    return userCollection.doc(email)["spotify"];
  }

  /* Profile information get functions */
  getBiography(email) {
    return userCollection.doc(email)["biography"];
  }

  getProfileLink(email) {
    return userCollection.doc(email)["profile_picture"];
  }

  getTopArtists(email) {
    return userCollection.doc(email)["top_artists"];
  }

  getTopGenres(email) {
    return userCollection.doc(email)["top_genres"];
  }

  getTopTracks(email) {
    return userCollection.doc(email)["top_tracks"];
  }

  // what is this function 
  /*create(user) {
    return db.add(user);
  }

  // I don't think email can be changed
  update(email, value) {
    return db.doc(email).update(value);
  }

  // i don't think we can delete this email
  delete(email) {
    return db.doc(email).delete();
  }*/
}

export default new UserService();
