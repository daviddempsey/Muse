const debug = require('debug')('firestore-snippets-node');

const admin = require('firebase-admin');

const console = {log: debug};

/*async function initializeApp() {
    process.env.GCLOUD_PROJECT = 'firestorebeta1test2';
    // [START initialize_app]
  
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    });
  
    const db = admin.firestore();
    // [END initialize_app]
    return db;
}

async function initializeAppFunctions() {
    process.env.GCLOUD_PROJECT = 'firestorebeta1test2';
    // [START initialize_app_functions]
    admin.initializeApp();
  
    const db = admin.firestore();
  
    // [END initialize_app_functions]
    return db;
}

async function initializeAppSA() {
    // [START initialize_app_service_account]
  
    const serviceAccount = require('./path/to/serviceAccountKey.json');
  
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  
    const db = admin.firestore();
  
    // [END initialize_app_service_account]
    return db;
}

async function demoInitialize(db) {
    // [START demo_initialize]
    // Fetch data from Firestore
    const snapshot = await db.collection('cities').get();
  
    // Print the ID and contents of each document
    snapshot.forEach(doc => {
      console.log(doc.id, ' => ', doc.data());
    });
    // [END demo_initialize]
}*/

// Firebase interaction functions
/*export async function createUser(db, email, displayName, spotifyID, refreshToken) {
    const userData = {
        name: displayName, 
        spotify_id: spotifyID,
        refresh_token: refreshToken, 
        location: [],
        profile: 'fuck', // hash function based on refresh token
        friends: [],
        messages: [],
        stats_id: '',
        in_harmony: 'fuckkkkkkkkk' // hash function based on refresh token
    }

    // add new user
    const res = await db.collection('user').doc(email).set(userData);

    // log to console the result
    console.log('Added', res);
}*/
