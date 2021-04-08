import admin from "firebase-admin";
import { initializeAdmin } from "../../../../util/auth/firebaseAdmin";

export default async (req: any, res: any) => {
  initializeAdmin();

  try {
    if (req.method === "POST") {
      try {
        admin.auth().setCustomUserClaims(req.body.uid, {
          admin: true,
        });
        res.status(200).json({ status: "Success" });
      } catch (err) {
        res.status(400).json({ message: err });
      }
    } else {
      res.status(400).json({ message: "Only accepts POST" });
    }
  } catch (e) {
    res.status(400).end();
  }
};
