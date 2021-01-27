import React from "react";
import Popup from "reactjs-popup";
import { GiCrossMark } from "react-icons/gi";

import styles from "./MainMenu.module.scss";

export const CreateGamePopUp = ({
  toggle,
  handleCreateGame,
  setNameTextBox,
  setCreateGamePopUp,
  nameTextBox,
}) => {
  return (
    <Popup open={toggle} closeOnDocumentClick={false}>
      <form className={styles.popup} onSubmit={(e) => handleCreateGame(e)}>
        <GiCrossMark
          className={styles.closeButton}
          onClick={() => setCreateGamePopUp(false)}
        />
        <input
          placeholder="Your Name"
          type="text"
          value={nameTextBox}
          onChange={(e) => setNameTextBox(e.target.value)}
        />
        <input type="submit" value="Create Game" />
      </form>
    </Popup>
  );
};

export const JoinGamePopUp = ({
  toggle,
  nameTextBox,
  gameIdTextBox,
  handleJoinGame,
  setJoinGamePopUp,
  setGameIdTextBox,
  setNameTextBox,
}) => {
  return (
    <Popup open={toggle} closeOnDocumentClick={false}>
      <form className={styles.popup} onSubmit={(e) => handleJoinGame(e)}>
        <GiCrossMark
          className={styles.closeButton}
          onClick={() => setJoinGamePopUp(false)}
        />
        <input
          placeholder="Game ID"
          type="text"
          value={gameIdTextBox}
          onChange={(e) => setGameIdTextBox(e.target.value.toUpperCase())}
        />
        <input
          placeholder="Name"
          type="text"
          value={nameTextBox}
          onChange={(e) => setNameTextBox(e.target.value)}
        />
        <input type="submit" value="JoinGame" />
      </form>
    </Popup>
  );
};

export const ContinueGamePopUp = ({
  toggle,
  playerIdTextBox,
  setPlayerIdTextBox,
  setContinueGamePopUp,
}) => {
  return (
    <Popup open={toggle} closeOnDocumentClick={false}>
      <form className={styles.popup}>
        <GiCrossMark
          className={styles.closeButton}
          onClick={() => setContinueGamePopUp(false)}
        />
        <input
          placeholder="Player ID"
          type="text"
          value={playerIdTextBox}
          onChange={(e) => setPlayerIdTextBox(e.target.value)}
        />
      </form>
    </Popup>
  );
};
