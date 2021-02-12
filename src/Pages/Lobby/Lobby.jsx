import React, { useState, useEffect } from "react";
import firebase from "../../firebaseInit";
import Popup from "reactjs-popup";
import styles from "./Lobby.module.scss";

import revealRoles from "./revealRoles";
import { GiSwordInStone } from "react-icons/gi";
import { rolesInfo } from "../../rolesRule";

var db = firebase.firestore();

const Lobby = ({ match }) => {
  const playerID = match.params.uid;
  const gameID = match.params.gameID;

  const [players, setPlayers] = useState([]);

  const [rolesIcon, setRolesIcon] = useState(null);
  const [userRoles, setUserRoles] = useState("");
  const [knownRoles, setKnownRoles] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const [startGamePopup, setStartGamePopup] = useState(false);

  useEffect(() => {
    const unsuscribe = db
      .collection("rooms")
      .doc(match.params.gameID)
      .onSnapshot((doc) => {
        const data = doc.data();
        console.log("Snapshot Updated");
        const players = data.players;
        setPlayers(players);
        if (data.gameStarted === true) {
          const [userRoles, knownRoles] = revealRoles(
            players,
            match.params.uid
          );
          setKnownRoles(knownRoles);
          setUserRoles(userRoles);
          setGameStarted(true);
          setRolesIcon(rolesInfo[userRoles].icon);
        }
      });
    return () => {
      unsuscribe();
    };
  });

  return (
    <section className={styles.section} id="lobby">
      <div>
        <h1 className={styles.title}>Game ID:</h1>
        <h1 className={styles.gameId}> {gameID}</h1>
      </div>
      <div className={styles.playersSection}>
        <h1 className={styles.playersSectionTitle}> Players: </h1>
        <ul className={styles.playersList}>
          {players.map((player, idx) => (
            <li
              key={idx}
              className={
                player.id === playerID
                  ? styles.playerHighlighted
                  : styles.playerNormal
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
        <h1 className={styles.buttonHide}>
          <GiSwordInStone className={styles.loadingIcon} />
          <p>Creating Island</p>
          <GiSwordInStone className={styles.loadingIcon} />
        </h1>
      )}

      <Popup open={startGamePopup} closeOnDocumentClick={false}>
        <div className={styles.popup}>
          <h1 className={styles.userRole}>
            {" "}
            Your role is <span>{userRoles}</span>
          </h1>
          <i className={styles.rolesIcon}>{rolesIcon}</i>
          <ul>
            {knownRoles.map((player, idx) => (
              <li key={idx} className={styles.playerDescription}>
                <span className={styles.playerName}>{player.name}</span> is{" "}
                <span className={styles.playerRoles}>{player.roles}</span>
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
