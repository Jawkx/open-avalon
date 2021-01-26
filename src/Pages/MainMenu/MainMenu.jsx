import React, { useState } from "react";

import { addGame } from "./addGame";
import joinGame from "./joinGame";

import styles from "./MainMenu.module.scss";
import { GiSwordInStone } from "react-icons/gi";

import {
  CreateGamePopUp,
  JoinGamePopUp,
  ContinueGamePopUp,
} from "./MainMenuPopUps";

const MainMenu = () => {
  // Popup trigger
  const [createGamePopUp, setCreateGamePopUp] = useState(false);
  const [joinGamePopUp, setJoinGamePopUp] = useState(false);
  const [continueGamePopUp, setContinueGamePopUp] = useState(false);

  // Textbox hook
  const [nameTextBox, setNameTextBox] = useState("");
  const [gameIdTextBox, setGameIdTextBox] = useState("");
  const [playerIdTextBox, setPlayerIdTextBox] = useState("");
  // Getting recoil value

  const handleCreateGame = (e) => {
    e.preventDefault();
    addGame(nameTextBox);
  };

  const handleJoinGame = (e) => {
    e.preventDefault();
    joinGame(gameIdTextBox, nameTextBox);
  };

  return (
    <div id="mainMenu" className={styles.section}>
      <GiSwordInStone className={styles.logo} />
      <h1 className={styles.title}>
        OPEN <br /> AVALON
      </h1>
      <h1
        className={styles.btn}
        onClick={() => setJoinGamePopUp(!joinGamePopUp)}
      >
        Join Game
      </h1>
      <h1
        className={styles.btn}
        onClick={() => setCreateGamePopUp(!createGamePopUp)}
      >
        Create Game
      </h1>
      <h1
        className={styles.btn}
        onClick={() => setContinueGamePopUp(!continueGamePopUp)}
      >
        Continue Game
      </h1>

      <CreateGamePopUp
        toggle={createGamePopUp}
        handleCreateGame={handleCreateGame}
        setNameTextBox={setNameTextBox}
        setCreateGamePopUp={setCreateGamePopUp}
        nameTextBox={nameTextBox}
      />

      <JoinGamePopUp
        toggle={joinGamePopUp}
        nameTextBox={nameTextBox}
        gameIdTextBox={gameIdTextBox}
        handleJoinGame={handleJoinGame}
        setJoinGamePopUp={setJoinGamePopUp}
        setGameIdTextBox={setGameIdTextBox}
        setNameTextBox={setNameTextBox}
      />

      <ContinueGamePopUp
        toggle={continueGamePopUp}
        playerIdTextBox={playerIdTextBox}
        setPlayerIdTextBox={setPlayerIdTextBox}
        setContinueGamePopUp={setContinueGamePopUp}
      />
    </div>
  );
};

export default MainMenu;
