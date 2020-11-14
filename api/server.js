// fire base stuff
var admin = require("firebase-admin");
var serviceAccount = require("../not-permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://muse-eec76.firebaseio.com"
});

const db = admin.firestore();

// express stuff
const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors");
app.use(cors({origin:true}));
app.listen(port, () => console.log("Backend server live on http://localhost:" + port));

// routing stuff
app.get("/", (req, res) => {
  res.send({ message: "We did it!" });
});

// Create
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

// Read

// Update

// Delete