import { createBrowserHistory } from "history";

let history = createBrowserHistory();
const toGame = (gameID, uid) => {
  history.push(`/game/${gameID}-${uid}`);
  history.go(0);
};

export default toGame;
