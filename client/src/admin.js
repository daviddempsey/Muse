var admin = require("firebase-admin");

var serviceAccount = require("./muse-eec76-firebase-adminsdk-pz3yl-262969d574.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://muse-eec76.firebaseio.com",
});
