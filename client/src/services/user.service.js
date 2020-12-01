//import firebase from 'firebase';
import fb from '../base.js';
//const db = firebase.firestore();
const userCollection = fb.firestore().collection('user');
const profileCollection = fb.firestore().collection('profile');
// we probably need to add more collections since we only reference user rn when we need
// to reference profile too

class UserService {
    getAll() {
        return userCollection.get();
    }

    getUser(email) {
        return userCollection.doc(email);
    }

    /*  getProfilePicture(email) {
           return userCollection.doc(email).get()['profile_picture'];

           getFacebook(email) {
        Promise.resolve('Success').then
        return profileCollection.doc(email).get().then(
            (res) => {
                let facebook = res.data()['social_media']['facebook'];
                console.log(facebook);
                return facebook;
            }
        );
    }
       } */

    /* SOCIAL MEDIA GET FUNCTIONS */
    /*async getFacebook(email) {
        return new Promise((resolve, reject) => {
            profileCollection.doc(email).get().data()['social_media']['facebook']
                .then(res => {
                    resolve(res)
                }, err => {
                    reject(err)
                })
        })
    }*/

    async getFacebook(email) {
        try {
            const response = await profileCollection.doc(email);
            const facebookData = await response.get();
            console.log(facebookData.data()['social_media']['facebook']);
            return facebookData.data()['social_media']['facebook'];
        } catch (error) {
            console.log(error);
        }
    }

    async getInstagram(email) {
        try {
            const response = await profileCollection.doc(email);
            const instaData = await response.get();
            console.log(instaData.data()['social_media']['instagram']);
            return instaData.data()['social_media']['instagram'];
        } catch (error) {
            console.log(error);
        }
    }

    async getTwitter(email) {
        try {
            const response = await profileCollection.doc(email);
            const twitterData = await response.get();
            console.log(twitterData.data()['social_media']['twitter']);
            return twitterData.data()['social_media']['twitter'];
        } catch (error) {
            console.log(error);
        }
    }

    getTikTok(email) {
            return profileCollection.doc(email).get()['social_media'];
        }
        /* 
                  getSpotify(email) {
                      return profileCollection.doc(email).get()['spotify'];
                  } */

    /* Profile information get functions */
    /* getBiography(email) {
          return userCollection.doc(email).get()['biography'];
      } */

    /*   getProfileLink(email) {
            return userCollection.doc(email).get()['profile_picture'];
        }

        getTopArtists(email) {
            return userCollection.doc(email).get()['top_artists'];
        }

        getTopGenres(email) {
            return userCollection.doc(email).get()['top_genres'];
        }

        getTopTracks(email) {
            return userCollection.doc(email).get()['top_tracks'];
        }

        getUserPlaylists(email) {
            return userCollection.doc(email).get()['playlists'];
        } 

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
        }*/

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