import firebase from "firebase";

const db = firebase.firestore();
const userCollection = db.collection("user");
// we probably need to add more collections since we only reference user rn when we need 
// to reference profile too

class UserService {
  getAll() {
    return userCollection.get();
  }

  getUser(email) {
    return userCollection.doc(email);
  }

  getProfilePicture(email) {
    return userCollection.doc(email).get()["profile_picture"];
  }

  /* SOCIAL MEDIA GET FUNCTIONS */
  getFacebook(email) {
    return userCollection.doc(email).get()["facebook"];
  }

  getInstagram(email) {
    return userCollection.doc(email).get()["instagram"];
  }

  getTwitter(email) {
    return userCollection.doc(email).get()["twitter"];
  }

  getTikTok(email) {
    return userCollection.doc(email).get()["tiktok"];
  }

  getSpotify(email) {
    return userCollection.doc(email).get()["spotify"];
  }

  /* Profile information get functions */
  getBiography(email) {
    return userCollection.doc(email).get()["biography"];
  }

  getProfileLink(email) {
    return userCollection.doc(email).get()["profile_picture"];
  }

  getTopArtists(email) {
    return userCollection.doc(email).get()["top_artists"];
  }

  getTopGenres(email) {
    return userCollection.doc(email).get()["top_genres"];
  }

  getTopTracks(email) {
    return userCollection.doc(email).get()["top_tracks"];
  }

  getSongStats(){
    // NO SONG STATS IN DATABASE YET 
  }
  getAlbumStats(){
    // NO ALBUM STATS IN DATABASE YET
  }
  getArtistStats(){
    // NO ARTIST STATS IN DATABASE YET
  }
  getMinuteStats(){
    // NO MINUTES STATS IN DATABASE YET
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
