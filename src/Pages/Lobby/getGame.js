import firebase from "../../firebaseInit";
var db = firebase.firestore();
export const getGame = (uid, setGameId) => {
  const userDbRef = db.collection("usersInfo");
  userDbRef
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists && doc.data.gameID != null) {
        setGameId(doc.data.gameID);
      } else {
        console.log("this user dont have any game assigned");
      }
    });
};
