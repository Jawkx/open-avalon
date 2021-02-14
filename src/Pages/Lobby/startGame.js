import { createBrowserHistory } from "history";

let history = createBrowserHistory();
const startGame = (gameID, uid) => {
  history.push(`/game/${gameID}-${uid}`);
  history.go(0);
};

export default startGame;
