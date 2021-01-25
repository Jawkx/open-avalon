const rolesDict = {
  oberon: {
    knew: [],
    side: false,
  },
  servant: {
    knew: [],
    side: true,
  },
  minion: {
    knew: ["minion", "assassin", "morgana", "mordred"],
    side: false,
  },
  merlin: {
    knew: ["minion", "assassin", "morgana"],
    side: true,
  },
  assassin: {
    knew: ["minion", "assassin", "morgana", "mordred"],
    side: false,
  },
  percival: {
    knew: ["merlin", "morgana"],
    side: true,
  },
  morgana: {
    knew: ["minion", "assassin", "morgana", "mordred"],
    side: false,
  },
  mordred: {
    knew: ["minion", "assassin", "morgana", "mordred"],
    side: false,
  },
};

const getKnewPlayers = (players, userRoles, userId) => {
  const knowRolesArr = rolesDict[userRoles].knew;

  var knownPlayers = players.filter(
    (player) => knowRolesArr.includes(player.roles) && player.id !== userId
  );

  const morganaPos = knownPlayers.findIndex(
    (player) => player.roles === "morgana"
  );

  if (userRoles === "percival" && morganaPos !== -1) {
    knownPlayers[morganaPos].roles = "merlin";
  }

  return knownPlayers;
};

const revealRoles = (players, userId) => {
  const userRoles = players.filter((player) => player.id === userId)[0].roles;

  const knownRoles = getKnewPlayers(players, userRoles, userId);

  return [userRoles, knownRoles];
};

export default revealRoles;
