import fb from "../base.js";
import firebase from "firebase/app";
import "firebase/firestore";

const userCollection = fb.firestore().collection("user");
const profileCollection = fb.firestore().collection("profile");
const statsCollection = fb.firestore().collection("stats");

class UserService {
  /* PROFILE EDIT FUNCTIONS */
  async setBiography(email, bio) {

    // url for the post function for set biography
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/user/profile/set_biography/" + email;
    
    // options to be added for the call
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({
        biography: bio 
      })
    };

    // upload new bio
    return await fetch(url, options)
    .catch((error) => {
      console.log(error);
    });
  }

  // changes user profile pic
  async setProfilePicture(email, profilePicLink) {
    
    // url for the post function for set profile pic
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/user/profile/set_profilepic/" + email;
    
    // options to be added for the call
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({
        profile_picture: profilePicLink 
      })
    };

    // upload new pic
    return await fetch(url, options)
    .catch((error) => {
      console.log(error);
    });
  }

  /* SOCIAL MEDIA EDIT FUNCTIONS */

  // set facebook profile link
  async setFacebook(email, facebookLink) {

    // url for the post function for set social media
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/user/profile/set_social_media/" + email;
    
    // options to be added for the call
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }, 
      data: JSON.stringify({
        "email": email
      }),
      body: JSON.stringify({
        "social_media_type": "facebook",
        "link": facebookLink
      })
    };

    // upload new link
    return await fetch(url, options).then((response) => {
      console.log(response.status);
    })
  }

  // set instagram profile link
  async setInstagram(email, instaLink) {
    
    // url for the post function for set social media
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/user/profile/set_social_media/" + email;
    
    // options to be added for the call
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({
        "social_media.instagram": instaLink
      })
    };

    // upload new link
    return await fetch(url, options)
    .catch((error) => {
      console.log(error);
    });
  }

  // set twitter profile link
  async setTwitter(email, twitterLink) {

    // url for the post function for set social media
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/user/profile/set_social_media/" + email;
    
    // options to be added for the call
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({
        "social_media.twitter": twitterLink
      })
    };

    // upload new link
    return await fetch(url, options)
    .catch((error) => {
      console.log(error);
    });
  }

  // set tiktok link
  async setTiktok(email, tiktokLink) {

    // url for the post function for set social media
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/user/profile/set_social_media/" + email;
    
    // options to be added for the call
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({
        "social_media.tiktok": tiktokLink
      })
    };

    // upload new link
    return await fetch(url, options)
    .catch((error) => {
      console.log(error);
    });
  }

  /* UPDATE USER FRIENDLIST (ADD FRIEND)*/

  // add friend to list 
  async addFriend(myEmail, newEmail) {

    // url for the post function for add friend
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/friends/add/" + myEmail + newEmail;
    
    // options to be added for the call
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }, 
    };

    // add new user
    return await fetch(url, options)
    .catch((error) => {
      console.log(error);
    });
  }

  // remove friend from list
  async removeFriend(myEmail, newEmail) {

    // url for the post function for remove friend
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/friends/remove/" + myEmail + newEmail;
    
    // options to be added for the call
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }, 
    };

    // remove user
    return await fetch(url, options)
    .catch((error) => {
      console.log(error);
    });
  }

  /* USER GET FUNCTIONS */
  // get refresh token 
  async getRefreshToken(email) {

    // url for the get refresh token call
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/user/refresh_token/" + email;
    
    // options to be added for the call
    const options = {
      method: "GET",
      headers: {
        Accept: "text/plain",
        "Content-Type": "text/plain",
      }
    };

    // get and return the refresh token
    return await fetch(url, options).then((response) => {
      return response.text();
    });
  }

  // get names of user requested
  async getName(email) {
    
    // url for the get name call
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/user/name/" + email;
    
    // options to be added for the call
    const options = {
      method: "GET",
      headers: {
        Accept: "text/plain",
        "Content-Type": "text/plain",
      }
    };

    // get and return the name
    return await fetch(url, options).then((response) => {
      return response.text();
    });


  }

  /* DOCUMENT GET FUNCTIONS */

  // gets all users 
  async getAll() {

    // url for the get all user call
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/users/all";
    
    // options to be added for the call
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    };

    // get and return all users
    return await fetch(url, options).then((response) => {
      return response.json().then((user) => {
        return user;
      });
    });
  }

  // gets the user's entire document
  async getUser(email) {

    // url for the get user call
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/user/" + email;
    
    // options to be added for the call
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    };

    // get and return the user
    return await fetch(url, options).then((response) => {
      return response.json().then((user) => {
        return user;
      });
    });
  }

  // get the user's entire user document
  async getUserFriends(email) {

    // url for the get friends call
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/user/friends/" + email;
    
    // options to be added for the call
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    };

    // get and return the friends list
    return await fetch(url, options).then((response) => {
      return response.json().then((user) => {
        return user;
      });
    });
  }

  // gets the whole profile of the user requested
  async getUserProfile(email) {

    // url for the get profile call
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/profile/" + email;
    
    // options to be added for the call
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    };

    // get and return the specific user profile
    return await fetch(url, options).then((response) => {
      return response.json().then((user) => {
        return user;
      });
    });
  }

  /* PROFILE INFORMATION GET FUNCTIONS */

  // gets the biography of the user requested
  async getBiography(email) {

    // url for the get bio call
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/profile/biography/" + email;
    
    // options to be added for the call
    const options = {
      method: "GET",
      headers: {
        Accept: "text/plain",
        "Content-Type": "text/plain",
      }
    };

    // get and return the biography
    return await fetch(url, options).then((response) => {
      return response.text();
    });
  }

  // gets the profile picture of the user requested
  async getProfilePicture(email) {

    // url for the get profile pic call
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/profile/profile_picture/" + email;
    
    // options to be added for the call
    const options = {
      method: "GET",
      headers: {
        Accept: "text/plain",
        "Content-Type": "text/plain",
      }
    };

    // get and return the pic url
    return await fetch(url, options).then((response) => {
      return response.text();
    });
  }

  /* SOCIAL MEDIA GET FUNCTIONS */
  // gets the facebook account of the user requested
  async getFacebook(email) {

    // url for the get facebook call
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/social/facebook/" + email;
    
    // options to be added for the call
    const options = {
      method: "GET",
      headers: {
        Accept: "text/plain",
        "Content-Type": "text/plain",
      }
    };

    // get and return the profile
    return await fetch(url, options).then((response) => {
      return response.text();
    });
  }

  // gets the twitter account of the user requested
  async getInstagram(email) {

    // url for the get ig call
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/social/instagram/" + email;
    
    // options to be added for the call
    const options = {
      method: "GET",
      headers: {
        Accept: "text/plain",
        "Content-Type": "text/plain",
      }
    };

    // get and return the handle
    return await fetch(url, options).then((response) => {
      return response.text();
    });
  }

  // gets the twitter account of the user requested
  async getTwitter(email) {

    // url for the get twitter call
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/social/twitter/" + email;
    
    // options to be added for the call
    const options = {
      method: "GET",
      headers: {
        Accept: "text/plain",
        "Content-Type": "text/plain",
      }
    };

    // get and return the handle
    return await fetch(url, options).then((response) => {
      return response.text();
    });
  }

  // gets the tiktok account of the user requested
  async getTikTok(email) {

    // url for the get tiktok call
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/social/tiktok/" + email;
    
    // options to be added for the call
    const options = {
      method: "GET",
      headers: {
        Accept: "text/plain",
        "Content-Type": "text/plain",
      }
    };

    // get and return the tiktok 
    return await fetch(url, options).then((response) => {
      return response.text();
    });
  }

  // gets the spotify account of the user requested
  async getSpotify(email) {

    // url for the get spotify call
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/social/spotify/" + email;
    
    // options to be added for the call
    const options = {
      method: "GET",
      headers: {
        Accept: "text/plain",
        "Content-Type": "text/plain",
      }
    };

    // get and return the spotify
    return await fetch(url, options).then((response) => {
      return response.text();
    });
  }

  /* STATS INFORMATION GET FUNCTIONS */
  // gets the top artists of the users requested
  async getTopArtists(email) {

    // url for the get top artists call
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/user/stats/top_artists/" + email;
    
    // options to be added for the call
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    };

    // get and return the top artists
    return await fetch(url, options).then((response) => {
      return response.json().then((user) => {
        return user;
      });
    });
  }

  // gets the top genres of the users requested
  async getTopGenres(email) {

    // url for the get top genres call
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/user/stats/top_genres/" + email;
    
    // options to be added for the call
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    };

    // get and return the top genres
    return await fetch(url, options).then((response) => {
      return response.json().then((user) => {
        return user;
      });
    });
  }

  // gets the top tracks of the users requested
  async getTopTracks(email) {

    // url for the get top tracks call
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/user/stats/top_tracks/" + email;
    
    // options to be added for the call
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    };

    // get and return the top tracks
    return await fetch(url, options).then((response) => {
      return response.json().then((user) => {
        return user;
      });
    });
  }

  // gets the spotify playlists of the user requested
  async getSpotifyPlaylists(email) {

    // url for the get playlists call
    const url = "http://localhost:5001/muse-eec76/us-central1/app/api/user/stats/public_playlists/" + email;
    
    // options to be added for the call
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    };

    // get and return the playlists
    return await fetch(url, options).then((response) => {
      return response.json().then((user) => {
        return user;
      });
    });
  }

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

  /* 
                create(user) {
                  return db.add(user);
                }

                update(email, value) {
                  return db.doc(email).update(value);
                }

                delete(email) {
                  return db.doc(email).delete();
                }
            */
}
export default new UserService();
