import React, { useEffect, useState } from "react";
import firebase from "../../firebaseInit";

import ProgressDisplay from "./ProgressDisplay.jsx";
import SelectionDisplay from "./SelectionDisplay.jsx";

var db = firebase.firestore();

const Game = ({ match }) => {
  const playerId = match.params.uid;
  const gameId = match.params.gameID;

  const [gameRef] = useState(db.collection("rooms").doc(gameId));

  const [gameData, setGameData] = useState(null);

  const updateSelectedPlayer = (playerId) => {
    console.log("Updated Selected Player", playerId);
    let updateValue;
    if (gameData.selectedPlayers.includes(playerId)) {
      updateValue = firebase.firestore.FieldValue.arrayRemove(playerId);
    } else {
      updateValue = firebase.firestore.FieldValue.arrayUnion(playerId);
    }

    gameRef.update({
      selectedPlayers: updateValue,
    });
  };

  const comfirmSelection = () => {
    console.log("Comfirmed Selection by king");
    gameRef.update({
      comfirmedSelection: true,
    });
  };

  const vote = (playerId, trueOrFalse) => {
    if (trueOrFalse) {
      gameRef.update({
        approvedPlayers: firebase.firestore.FieldValue.arrayUnion(playerId),
      });
    }

    gameRef.update({
      voteCount: firebase.firestore.FieldValue.increment(1),
    });
  };

  useEffect(() => {
    const unsubscribe = db
      .collection("rooms")
      .doc(match.params.gameID)
      .onSnapshot((doc) => {
        console.log("onSnapshot");
        const data = doc.data();
        setGameData(data);
      });
    return () => {
      unsubscribe();
    };
  }, [match]);

  return (
    <section>
      {gameData && (
        <div>
          <ProgressDisplay
            missions={gameData.missions}
            currentMission={gameData.missions[gameData.currentMission]}
            rejectCount={gameData.rejectCount}
          />
          <SelectionDisplay
            currentKingId={gameData.currentKingId}
            playerId={playerId}
            allPlayers={gameData.players}
            selectedPlayers={gameData.selectedPlayers}
            comfirmedSelection={gameData.comfirmedSelection}
            currentMission={gameData.missions[gameData.currentMission]}
            updateSelectedPlayer={updateSelectedPlayer}
            comfirmSelection={comfirmSelection}
            vote={vote}
          />
        </div>
      )}
    </section>
  );
};

export default Game;
