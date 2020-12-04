import fb from "../base.js";
import "firebase/firestore";

const userCollection = fb.firestore().collection("user");
const profileCollection = fb.firestore().collection("profile");
const statsCollection = fb.firestore().collection("stats");

class UserService {
  /* PROFILE EDIT FUNCTIONS */
  async setBiography(email, bio) {
    try {
      // get the document to be changed
      const profileDoc = await profileCollection.doc(email);
      await profileDoc.update({
        biography: bio,
      });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  async setProfilePicture(email, profilePicLink) {
    try {
      // get the profile document to be changed
      const profileDoc = await profileCollection.doc(email);
      await profileDoc.update({
        profile_picture: profilePicLink,
      });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  async setPlaylist(email, playlist) {}

  /* SOCIAL MEDIA EDIT FUNCTIONS */
  async setFacebook(email, facebookLink) {
    try {
      // get the document to be changed
      const profileDoc = profileCollection.doc(email);
      await profileDoc.update({
        "social_media.facebook": facebookLink,
      });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  async setInstagram(email, instaLink) {
    try {
      // get the document to be changed
      const profileDoc = profileCollection.doc(email);
      await profileDoc.update({
        "social_media.instagram": instaLink,
      });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  async setTwitter(email, twitterLink) {
    try {
      // get the document to be changed
      const profileDoc = profileCollection.doc(email);
      await profileDoc.update({
        "social_media.twitter": twitterLink,
      });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  async setTiktok(email, tiktokLink) {
    try {
      // get the document to be changed
      const profileDoc = profileCollection.doc(email);
      await profileDoc.update({
        "social_media.tiktok": tiktokLink,
      });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  /* DOCUMENT GET FUNCTIONS */
  async getAll() {
    try {
      const response = await userCollection.get();
      const allUsers = response.data();
      return allUsers;
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  async getUser(email) {
    try {
      const response = await userCollection.doc(email);
      const userDoc = await response.get();
      return userDoc.data();
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  async getUserProfile(email) {
    try {
      const response = await profileCollection.doc(email);
      const userProfileDoc = await response.get();
      return userProfileDoc.data();
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  /* PROFILE INFORMATION GET FUNCTIONS */
  async getBiography(email) {
    try {
      const response = await profileCollection.doc(email);
      const biography = await response.get();
      return biography.data()["biography"];
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  async getProfilePicture(email) {
    // try getting the profile picture
    try {
      const response = await profileCollection.doc(email);
      const profilePic = await response.get();
      return profilePic.data()["profile_picture"];
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  async getProfileLink(email) {
    // try getting the profile link
    try {
      const response = await profileCollection.doc(email);
      const profileLink = await response.get();
      return profileLink.data()["profile_url"];
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  /* SOCIAL MEDIA GET FUNCTIONS */
  async getFacebook(email) {
    try {
      const response = await profileCollection.doc(email);
      const facebookData = await response.get();
      return facebookData.data()["social_media"]["facebook"];
    } catch (error) {
      console.log(error);
    }
  }

  async getInstagram(email) {
    try {
      const response = await profileCollection.doc(email);
      const instaData = await response.get();
      return instaData.data()["social_media"]["instagram"];
    } catch (error) {
      console.log(error);
    }
  }

  async getTwitter(email) {
    try {
      const response = await profileCollection.doc(email);
      const twitterData = await response.get();
      return twitterData.data()["social_media"]["twitter"];
    } catch (error) {
      console.log(error);
    }
  }

  async getTikTok(email) {
    try {
      const response = await profileCollection.doc(email);
      const tiktokData = await response.get();
      return tiktokData.data()["social_media"]["tiktok"];
    } catch (error) {
      console.log(error);
    }
  }

  async getSpotify(email) {
    try {
      const response = await profileCollection.doc(email);
      const spotifyData = await response.get();
      console.log(spotifyData.data()["social_media"]["spotify"]);
      return spotifyData.data()["social_media"]["spotify"];
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  /* STATS INFORMATION GET FUNCTIONS */
  async getTopArtists(email) {
    try {
      const response = await statsCollection.doc(email);
      const topArtists = await response.get();
      return topArtists.data()["top_artists"];
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  async getTopGenres(email) {
    try {
      const response = await statsCollection.doc(email);
      const topGenres = await response.get();
      return topGenres.data()["top_genres"];
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  async getTopTracks(email) {
    try {
      const response = await statsCollection.doc(email);
      const topTracks = await response.get();
      return topTracks.data()["top_tracks"];
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  /* SPOTIFY REAL TIME DATA FETCH */
  /*async getSpotifyPlaylists(refreshToken) {
              // get the access token 
              // get the spotify playlists

            }*/

  /* Profile information get functions */
  /*
                getSongStats() {
                    // NO SONG STATS IN DATABASE YET
                }
                getAlbumStats() {
                    // NO ALBUM STATS IN DATABASE YET
                }
                getArtistStats() {
                    // NO ARTIST STATS IN DATABASE YET
                }
                getMinuteStats() {
                    // NO MINUTES STATS IN DATABASE YET
                }
            */

  // what is this function
  /* 
                create(user) {
                  return db.add(user);
                }

                // I don't think email can be changed
                update(email, value) {
                  return db.doc(email).update(value);
                }

                // i don't think we can delete this email
                delete(email) {
                  return db.doc(email).delete();
                }
            */
}

export default new UserService();
