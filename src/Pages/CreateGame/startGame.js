import { minionsNum, rolesInfo, missionInfo } from "../../rolesRule";

const shuffle = (arr) => {
  var j, x, i;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return arr;
};

const generateMissions = (playersCount) => {
  if (playersCount < 5) {
    console.log("ERROR AT GENERATE MISSION");
  }

  const requiredPlayers = missionInfo[playersCount].requiredPlayers;
  const requireMultipleFails = missionInfo[playersCount].requireMultipleFails;

  let missionsDetail = [];
  let missionDetail = {};
  for (let round = 0; round < 5; round++) {
    missionDetail = {
      round: round,
      requiredPlayer: requiredPlayers[round],
      requireMultipleFail: requireMultipleFails[round],
      roundWinner: null,
      roundFinished: false,
      players: [],
    };

    missionsDetail.push(missionDetail);
  }

  return missionsDetail;
};

const assignRoles = (players, specialRoles) => {
  var rolesArray = [];
  var assignedRolesArr = [];
  var minionsCount = minionsNum[players.length];

  for (let [role, present] of Object.entries(specialRoles)) {
    if (present) {
      rolesArray.push(role);
      if (!rolesInfo[role].side) {
        minionsCount -= 1;
      }
    }
  }

  for (let i = 0; i < minionsCount; i++) {
    rolesArray.push("minion");
  }

  for (let i = rolesArray.length; i < players.length; i++) {
    rolesArray.push("servant");
  }

  rolesArray = shuffle(rolesArray);

  players.forEach((player, idx) => {
    assignedRolesArr.push({
      name: player.name,
      id: player.id,
      roles: rolesArray[idx],
    });
  });

  return assignedRolesArr;
};

const startGame = (gameRef, players, specialRoles) => {
  const assignedRolesPlayers = assignRoles(players, specialRoles);
  const missionsDetail = generateMissions(players.length);
  gameRef.update({
    players: assignedRolesPlayers,
    gameStarted: true,
    missions: missionsDetail,
  });
};
export default startGame;
