import React from "react";

const WaitVoteResult = ({ players, approvedPlayersId, voteCount }) => {
  const playersCount = players.length;
  let display;
  let voteCompleted = Boolean(voteCount === playersCount);

  if (voteCompleted) {
    let approvedPlayers = [];
    let rejectedPlayers = [];
    players.forEach((player) => {
      if (approvedPlayersId.includes(player.id)) {
        approvedPlayers.push(player);
      } else {
        rejectedPlayers.push(player);
      }
    });

    const isSuccess = Boolean(approvedPlayers > rejectedPlayers);

    display = (
      <div>
        <h1> Approved Players </h1>
        <ul>
          {approvedPlayers.map((players, idx) => (
            <li key={idx}> {players.name}</li>
          ))}
        </ul>
        <h1> Rejected Players </h1>
        <ul>
          {rejectedPlayers.map((players, idx) => (
            <li key={idx}> {players.name}</li>
          ))}
        </ul>
        <h1>Result</h1>
        {isSuccess ? (
          <h1> Majority Approved </h1>
        ) : (
          <h1> Majority Rejected </h1>
        )}
      </div>
    );
  } else {
    display = (
      <div>
        <h1> Waiting of {playersCount - voteCount} players to vote </h1>
        {/* {Animation here} */}
      </div>
    );
  }

  return display;
};

export default WaitVoteResult;
