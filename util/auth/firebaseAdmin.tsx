import admin from "firebase-admin";
const serviceAccount = require("../secrets.json");

export const initializeAdmin = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.databaseURL,
    });
  }
};

export const verifyIdToken = (token: string) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.databaseURL,
    });
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch((err) => {
      console.log(err);
    });
};
