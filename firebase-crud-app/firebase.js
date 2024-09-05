// firebase.js cấu hình kết nối FileStorage
const admin = require('firebase-admin');
const serviceAccount = require('./my-firebase-project-16d3c-firebase-adminsdk-usyxe-fd6ecb9cd9.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-firebase-project-16d3c-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

module.exports = db;
