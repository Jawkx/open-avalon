import React, { useState, useEffect } from "react";
import firebase from "../../firebaseInit";
import Popup from "reactjs-popup";

import startGame from "./startGame";
import swapArray from "./swapArray";
import revealRoles from "../Lobby/revealRoles";

import styles from "./CreateGame.module.scss";
import { GiFallDown } from "react-icons/gi";

import { minionsNum, rolesInfo } from "../../rolesRule";
var db = firebase.firestore();

const CreateGame = ({ match }) => {
  const [players, setPlayers] = useState([]);
  const [specialRoles, setSpecialRoles] = useState({
    merlin: false,
    assassin: false,
    percival: false,
    morgana: false,
    oberon: false,
    mordred: false,
  });

  const [rolesIcon, setRolesIcon] = useState(null);
  const [userRoles, setUserRoles] = useState("");
  const [knownRoles, setKnownRoles] = useState([]);
  const [startGamePopup, setStartGamePopup] = useState(false);

  useEffect(() => {
    const unsuscribe = db
      .collection("rooms")
      .doc(match.params.gameID)
      .onSnapshot((doc) => {
        const data = doc.data();
        const players = data.players;
        setPlayers(players);
        if (data.gameStarted === true) {
          const [userRoles, knownRoles] = revealRoles(
            players,
            match.params.uid
          );
          setKnownRoles(knownRoles);
          setUserRoles(userRoles);
          setRolesIcon(rolesInfo[userRoles].icon);
        }
      });
    return () => {
      unsuscribe();
    };
  });

  const switchRoles = (roles) => {
    window.navigator.vibrate(25);
    setSpecialRoles((prev) => ({ ...prev, [roles]: !prev[roles] }));
  };

  const handleSwapArray = (idx, upDown) => {
    window.navigator.vibrate(25);
    db.collection("rooms")
      .doc(match.params.gameID)
      .update({
        players: swapArray(players, idx, upDown),
      });
  };

  const handleStartGame = () => {
    startGame(
      db.collection("rooms").doc(match.params.gameID),
      players,
      specialRoles
    );
    setStartGamePopup(true);
  };

  const playersJsx = players.map((player, idx) => (
    <li className={styles.player} idx={idx} key={idx}>
      <GiFallDown
        className={idx === 0 ? styles.hiddenDown : styles.arrowUp}
        onClick={() => handleSwapArray(idx, true)}
      />
      {player.name}
      <GiFallDown
        className={
          idx === players.length - 1 ? styles.hiddenUp : styles.arrowDown
        }
        onClick={() => handleSwapArray(idx, false)}
      />
    </li>
  ));

  let rolesSelectionButtons = [];

  for (let [roles] of Object.entries(rolesInfo)) {
    if (rolesInfo[roles].isSpecial) {
      rolesSelectionButtons.push(
        <li
          key={roles}
          className={
            specialRoles[roles]
              ? styles.rolesButtonHighlighted
              : styles.rolesButtonNormal
          }
          onClick={() => switchRoles(roles)}
        >
          {rolesInfo[roles].icon} {roles}
        </li>
      );
    }
  }

  return (
    <section className={styles.section} id="create-game">
      <div>
        <h1 className={styles.title}>Game ID</h1>
        <h1 className={styles.gameId}> {match.params.gameID} </h1>
      </div>
      <div className={styles.playersSection}>
        <h1 className={styles.playersSectionTitle}> Players </h1>
        <ul>{playersJsx}</ul>
      </div>
      {players.length >= 5 && (
        <p className={styles.info}>
          There will be {minionsNum[players.length]} impostor from Mordred in
          this Island
        </p>
      )}

      <div className={styles.rolesSection}>
        <h1 className={styles.rolesSectionTitle}>Roles Selection</h1>
        <ul className={styles.rolesButtonsContainer}>
          {rolesSelectionButtons}
        </ul>
      </div>

      {players.length >= 5 ? (
        <h2
          className={styles.startGameButton}
          onClick={() => handleStartGame()}
        >
          Create Island
        </h2>
      ) : (
        <p className={styles.warning}> Minimum 5 players for a game </p>
      )}

      <Popup open={startGamePopup} closeOnDocumentClick={false}>
        <div className={styles.popup}>
          <h1 className={styles.userRole}>
            Your role is <span>{userRoles}</span>
          </h1>
          <i className={styles.rolesIcon}>{rolesIcon}</i>
          <ul>
            {knownRoles.map((player, idx) => (
              <li key={idx} className={styles.playerDescription}>
                <span className={styles.playerName}>{player.name}</span> is{" "}
                <span className={styles.playerRoles}>{player.roles} </span>
              </li>
            ))}
          </ul>
        </div>
      </Popup>
    </section>
  );
};

export default CreateGame;
