import React from "react";

import { GiJewelCrown, GiSwordInStone } from "react-icons/gi";
const SelectionDisplay = ({
  currentKingId,
  playerId,
  allPlayers,
  selectedPlayers,
  comfirmedSelection,
  currentMission,
  //Function
  updateSelectedPlayer,
  comfirmSelection,
  vote,
}) => {
  const isKing = Boolean(currentKingId === playerId); //check if player is the king
  console.log(currentMission);
  const requiredPlayersNum = currentMission.requiredPlayer;

  const playersJsx = allPlayers.map((player, idx) => (
    <li
      key={idx}
      onClick={isKing ? () => updateSelectedPlayer(player.id) : null}
    >
      {player.id === currentKingId ? <GiJewelCrown /> : null}
      <p>{player.name}</p>
      {selectedPlayers.includes(player.id) ? <GiSwordInStone /> : null}
    </li>
  ));

  var buttons;

  if (isKing && selectedPlayers.length !== requiredPlayersNum) {
    let difference = selectedPlayers.length - requiredPlayersNum;
    if (difference > 0) {
      buttons = <p>Select {difference} more servant to lock in selection</p>;
    } else {
      buttons = <p>Remove {-difference} servant to lock in selection </p>;
    }
  } else if (isKing) {
    buttons = <p onClick={() => comfirmSelection}> Lock in your selection</p>;
  } else if (comfirmedSelection) {
    buttons = (
      <div>
        <p onClick={() => vote(playerId, true)}>Approve</p>
        <p onClick={() => vote(playerId, false)}>Reject</p>
      </div>
    );
  } else {
    buttons = (
      <div>
        <p>Wait for selection by King</p>
      </div>
    );
  }

  return (
    <div>
      <p>
        {isKing
          ? `You are the King, select ${requiredPlayersNum} servants to start the mission`
          : "Wait for King to make selection"}
      </p>
      <ul> {playersJsx} </ul>
      {buttons}
    </div>
  );
};

export default SelectionDisplay;
