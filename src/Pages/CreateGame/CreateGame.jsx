import React, { useState, useEffect } from "react";
import firebase from "../../firebaseInit";
import Popup from "reactjs-popup";

import startGame from "./startGame";
import swapArray from "./swapArray";
import revealRoles from "../Lobby/revealRoles";

import styles from "./CreateGame.module.scss";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

var db = firebase.firestore();

const CreateGame = ({ match }) => {
  const playerID = match.params.uid;
  const gameId = match.params.gameID;

  const gameRef = db.collection("games").doc(gameId);
  const [players, setPlayers] = useState([]);
  const [specialRoles, setSpecialRoles] = useState({
    merlin: false,
    assassin: false,
    percival: false,
    morgana: false,
    oberon: false,
    mordred: false,
  });

  const [userRoles, setUserRoles] = useState("");
  const [knownRoles, setKnownRoles] = useState([]);
  const [startGamePopup, setStartGamePopup] = useState(false);

  useEffect(() => {
    const unsuscribe = gameRef.onSnapshot((doc) => {
      const data = doc.data();
      const players = data.players;
      setPlayers(players);
      if (data.gameStarted === true) {
        const [userRoles, knownRoles] = revealRoles(players, playerID);
        setKnownRoles(knownRoles);
        setUserRoles(userRoles);
      }
    });
    return () => {
      unsuscribe();
    };
  }, [gameRef, playerID]);

  const switchRoles = (roles) => {
    setSpecialRoles((prev) => ({ ...prev, [roles]: !prev[roles] }));
  };

  const handleSwapArray = (idx, upDown) => {
    gameRef.update({
      players: swapArray(players, idx, upDown),
    });
  };

  const handleStartGame = () => {
    startGame(gameRef, players, specialRoles);
    setStartGamePopup(true);
  };
  const playersJsx = players.map((player, idx) => (
    <li idx={idx}>
      <MdKeyboardArrowUp
        className={idx === 0 ? styles.hidden : null}
        onClick={() => handleSwapArray(idx, true)}
      />
      {player.name}
      <MdKeyboardArrowDown
        className={idx === players.length - 1 ? styles.hidden : null}
        onClick={() => handleSwapArray(idx, false)}
      />
    </li>
  ));

  var rolesSelectionButtons = [];

  for (let [roles] of Object.entries(specialRoles)) {
    rolesSelectionButtons.push(
      <li
        className={specialRoles[roles] ? styles.highlighted : styles.normal}
        onClick={() => switchRoles(roles)}
      >
        {roles}
      </li>
    );
  }
  return (
    <section className={styles.section} id="create-game">
      <div className={styles.idContainer}>
        <h1 className={styles.title}> Game ID: </h1>
        <h1 className={styles.gameId}> {gameId} </h1>
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}> Players </h1>
        <ul className={styles.playersList}>{playersJsx}</ul>
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>Roles Selection</h1>
        <ul className={styles.rolesSelections}>{rolesSelectionButtons}</ul>
      </div>
      <h2 className={styles.startGame} onClick={() => handleStartGame()}>
        Start Game
      </h2>
      <Popup open={startGamePopup} closeOnDocumentClick={false}>
        <h1> Your role is {userRoles}</h1>
        <ul>
          {knownRoles.map((player) => (
            <li>
              {player.name} is a {player.roles}
            </li>
          ))}
        </ul>
      </Popup>
    </section>
  );
};

export default CreateGame;
