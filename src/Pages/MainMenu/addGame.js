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

export const addGame = (firstPlayerName) => {
  const gameID = makeID(5).toUpperCase();
  const playerID = makeID(10);
  const gameData = {
    gameID: gameID,
    gameCreatorID: playerID,
    gameStarted: false,
    players: [
      {
        name: firstPlayerName,
        id: playerID,
      },
    ],
  };

  db.collection("rooms")
    .doc(gameID)
    .set(gameData)
    .then(() => {
      window.location.href = `create-game/${gameID}-${playerID}`;
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
};
