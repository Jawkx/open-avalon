const firebase = require("firebase").default;
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyA3A61PJhc-kureWLytyWXjs4cu6DMdphE",
  authDomain: "avalon-online-f6c7b.firebaseapp.com",
  projectId: "avalon-online-f6c7b",
});

export default firebase;
