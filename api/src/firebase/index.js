const admin = require("firebase-admin");
const serviceAccount = require("./serviceaccountkey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.databaseURL
});

const auth = admin.auth();

const firestore = admin.firestore();

module.exports = { auth, firestore };