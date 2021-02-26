import firebase from "../../firebaseInit";
var db = firebase.firestore();

const makeID = (length) => {
  var result = "";
  var characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const joinGame = (gameID, name) => {
  const gameRef = db.collection("rooms").doc(gameID);

  gameRef.get().then((doc) => {
    if (doc.exists && !doc.data().gameStarted) {
      const playerID = makeID(10);
      const playerData = {
        name: name,
        id: playerID,
      };
      const newPlayers = doc.data().players.concat(playerData);

      gameRef
        .update({
          players: newPlayers,
        })
        .then(() => {
          window.location.href = `/lobby/${gameID}-${playerID}`;
        });
    } else {
      alert("INVALID GAME ID OR GAME HAD STARTED");
    }
  });
};

export default joinGame;
