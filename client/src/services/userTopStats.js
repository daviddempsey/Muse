import firebase from "../firebase";

const db = firebase.collection("/stats"); // store the users stats 

class UserTopStats{

    // method to get the top artist

    //im unsure how to get the first index in the array of data so i used .val() as a placeholder
    getTopArtist(email){
            return db.doc(email).get("top_artists").val(); 
        // get the top artist, call .val() to get the first artist in the array of top artists
        }
        
    getTopTrack(email){
        return db.doc(email).get("top_tracks").val();
        // get the top track tbh idk if this works or not
    }
    
    }
}

export default new UserTopStats();