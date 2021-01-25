import React, { useState, useEffect } from "react";
import firebase from "../../firebaseInit";
import Popup from "reactjs-popup";
import styles from "./Lobby.module.scss";

import revealRoles from "./revealRoles";

var db = firebase.firestore();
const Lobby = ({ match }) => {
  const playerID = match.params.uid;
  const gameID = match.params.gameID;

  const gameRef = db.collection("games").doc(gameID);
  const [players, setPlayers] = useState([]);
  const [userRoles, setUserRoles] = useState("");
  const [knownRoles, setKnownRoles] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

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
        setGameStarted(true);
      }
    });
    return () => {
      unsuscribe();
    };
  }, []);

  return (
    <section className={styles.section} id="lobby">
      <div>
        <h1 className={styles.title}>Game ID:</h1>
        <h1 className={styles.gameId}> {gameID}</h1>
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}> Players: </h1>
        <ul className={styles.playersList}>
          {players.map((player) => (
            <li
              className={
                player.id === playerID ? styles.highlighted : styles.normal
              }
            >
              {player.name}
            </li>
          ))}
        </ul>
      </div>
      {gameStarted ? (
        <h1 onClick={() => setStartGamePopup(true)}> Start Game </h1>
      ) : (
        <h1>Game Not Yet Started</h1>
      )}
      <Popup open={startGamePopup} closeOnDocumentClick={false}>
        <div className={styles.popup}>
          <h1> Your role is {userRoles}</h1>
          <ul>
            {knownRoles.map((player) => (
              <li>
                {player.name} is a {player.roles}
              </li>
            ))}
          </ul>
          <h1>Start Game</h1>
        </div>
      </Popup>
    </section>
  );
};

export default Lobby;
