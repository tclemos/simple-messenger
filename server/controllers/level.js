const admin = require("firebase-admin");
const serviceAccount = require("../firebase/simple-messenger-oss-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.REACT_APP_PROJECT_ID}.firebaseio.com`
});

module.exports = {
  async index(req, res) {
    const body = { level: "user" }
    const { uid } = req.query;
    if (!uid) {
      return res.json(body);
    }

    let user = null

    try {
      user = await admin.auth().getUser(uid)
    } catch {
      return res.json(body);  
    }

    if (user.customClaims && user.customClaims.admin) {
      body.level = "admin"
    }

    return res.json(body);
  },
};


