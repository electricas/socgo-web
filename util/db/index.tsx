import firebase from "firebase";

const FIREBASE_CONFIG = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

if (!firebase.apps.length) {
  try {
    firebase.initializeApp(FIREBASE_CONFIG);
  } catch (err) {
    console.log("firebase db init error", err.stack);
  }
}
export default firebase.firestore();
