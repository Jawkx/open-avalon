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

const minionsNum = {
  5: 2,
  6: 2,
  7: 3,
  8: 3,
  9: 3,
  10: 4,
};

const specialRolesSide = {
  merlin: true,
  assassin: false,
  percival: true,
  morgana: false,
  oberon: false,
  mordred: false,
};

const assignRoles = (players, specialRoles) => {
  var rolesArray = [];
  var assignedRolesArr = [];
  var minionsCount = minionsNum[players.length];

  for (let [key, value] of Object.entries(specialRoles)) {
    if (value) {
      rolesArray.push(key);
      if (!specialRolesSide[key]) {
        minionsCount -= 1;
      }
    }
  }

  rolesArray = shuffle(rolesArray);

  for (let i = 0; i < minionsCount; i++) {
    rolesArray.push("minion");
  }

  for (let i = rolesArray.length; i < players.length; i++) {
    rolesArray.push("servant");
  }

  players.forEach((player, idx) => {
    assignedRolesArr.push({
      name: player.name,
      id: player.id,
      roles: rolesArray[idx],
    });
  });

  console.log(assignedRolesArr);
  return assignedRolesArr;
};

const startGame = (gameRef, players, specialRoles) => {
  const assignedRolesPlayers = assignRoles(players, specialRoles);

  gameRef.update({
    players: assignedRolesPlayers,
    gameStarted: true,
  });
};
export default startGame;
