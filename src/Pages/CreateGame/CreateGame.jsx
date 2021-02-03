import React, { useState, useEffect } from "react";
import firebase from "../../firebaseInit";
import Popup from "reactjs-popup";

import startGame from "./startGame";
import swapArray from "./swapArray";
import revealRoles from "../Lobby/revealRoles";

import styles from "./CreateGame.module.scss";
import {
  GiFallDown,
  GiWingedScepter,
  GiMachete,
  GiDualityMask,
  GiCrownedSkull,
  GiDaemonSkull,
  GiWizardStaff,
} from "react-icons/gi";

var db = firebase.firestore();

const rolesIconDict = {
  merlin: <GiWizardStaff />,
  assassin: <GiMachete />,
  percival: <GiWingedScepter />,
  morgana: <GiDualityMask />,
  oberon: <GiDaemonSkull />,
  mordred: <GiCrownedSkull />,
};

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

  var rolesSelectionButtons = [];

  for (let [roles] of Object.entries(specialRoles)) {
    rolesSelectionButtons.push(
      <li
        className={
          specialRoles[roles]
            ? styles.rolesButtonHighlighted
            : styles.rolesButtonNormal
        }
        onClick={() => switchRoles(roles)}
      >
        {rolesIconDict[roles]} {roles}
      </li>
    );
  }
  return (
    <section className={styles.section} id="create-game">
      <div>
        <h1 className={styles.title}>Game ID</h1>
        <h1 className={styles.gameId}> {gameId} </h1>
      </div>
      <div className={styles.playersSection}>
        <h1 className={styles.playersSectionTitle}> Players </h1>
        <ul>{playersJsx}</ul>
      </div>
      <div className={styles.rolesSection}>
        <h1 className={styles.rolesSectionTitle}>Roles Selection</h1>
        <ul className={styles.rolesButtonsContainer}>
          {rolesSelectionButtons}
        </ul>
      </div>
      <h2 onClick={() => handleStartGame()}>Start Game</h2>
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
