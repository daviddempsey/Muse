// references to firebase functions
const functions = require('firebase-functions');

// firebase admin
const admin = require('firebase-admin');
var serviceAccount = require("./permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://muse-eec76.firebaseio.com"
});

const express = require('express');
const app = express();
const db = admin.firestore();

// create cores 
const cors = require('cors');
app.use( cors({origin: true}));

// Routes
app.get('/yessir', (req, res) => {
    return res.status(200).send('We did it!');
});

// Create, POST

// this a sample version
app.post('/api/create', (req, res) => {
    (async () => {

        try {
            await db.collection('products').doc('/' + req.body.id + '/')
            .create({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price
            })

            return res.status(200).send();
        } catch (error) {

            // if there happens to be an error, log and send error
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// another example
app.post("/api/poststuff", (req, res) => {
    console.log("check post");
    (async() => {
      try {
        await db.collection('login').doc('/' + req.body.id + '/')
        .create({
          access: req.body.access,
          refresh: req.body.refresh
        })
  
        return res.status(200).send();
      }
      catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  });

// Read, GET

// Update, PUT

// Delete, DELETE


// call function whenever there's a new request
// export api to Firebase cloud functions
exports.app = functions.https.onRequest(app);