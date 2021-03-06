import {
  GiBarbarian,
  GiOrcHead,
  GiWingedScepter,
  GiMachete,
  GiDualityMask,
  GiCrownedSkull,
  GiDaemonSkull,
  GiWizardStaff,
} from "react-icons/gi";

export const minionsNum = {
  5: 2,
  6: 2,
  7: 3,
  8: 3,
  9: 3,
  10: 4,
};

export const missionInfo = {
  5: {
    requiredPlayers: [2, 3, 2, 3, 3],
    requireMultipleFails: [false, false, false, false, false],
  },
  6: {
    requiredPlayers: [2, 3, 4, 3, 4],
    requireMultipleFails: [false, false, false, false, false],
  },
  7: {
    requiredPlayers: [2, 3, 3, 4, 4],
    requireMultipleFails: [false, false, false, true, false],
  },
  8: {
    requiredPlayers: [3, 4, 4, 5, 5],
    requireMultipleFails: [false, false, false, true, false],
  },
  9: {
    requiredPlayers: [3, 4, 4, 5, 5],
    requireMultipleFails: [false, false, false, true, false],
  },
  10: {
    requiredPlayers: [3, 4, 4, 5, 5],
    requireMultipleFails: [false, false, false, true, false],
  },
};

export const rolesInfo = {
  servant: {
    icon: <GiBarbarian />,
    knew: null,
    side: true,
    isSpecial: false,
  },
  minion: {
    icon: <GiOrcHead />,
    knew: null,
    side: false,
    isSpecial: false,
  },
  merlin: {
    icon: <GiWizardStaff />,
    knew: null,
    side: true,
    isSpecial: true,
  },
  assassin: {
    icon: <GiMachete />,
    knew: null,
    side: false,
    isSpecial: true,
  },
  percival: {
    icon: <GiWingedScepter />,
    knew: null,
    side: true,
    isSpecial: true,
  },
  morgana: {
    icon: <GiDualityMask />,
    knew: null,
    side: false,
    isSpecial: true,
  },
  oberon: {
    icon: <GiDaemonSkull />,
    knew: null,
    side: false,
    isSpecial: true,
  },
  mordred: {
    icon: <GiCrownedSkull />,
    knew: null,
    side: false,
    isSpecial: true,
  },
};
