import React from "react";
import Popup from "reactjs-popup";
import { MdClose } from "react-icons/md";

export const CreateGamePopUp = ({
  toggle,
  handleCreateGame,
  setNameTextBox,
  setCreateGamePopUp,
  nameTextBox,
}) => {
  return (
    <Popup open={toggle} closeOnDocumentClick={false}>
      <form onSubmit={(e) => handleCreateGame(e)}>
        <MdClose onClick={() => setCreateGamePopUp(false)} />
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
      <form onSubmit={(e) => handleJoinGame(e)}>
        <MdClose onClick={() => setJoinGamePopUp(false)} />
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
      <form>
        <MdClose onClick={() => setContinueGamePopUp(false)} />
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
