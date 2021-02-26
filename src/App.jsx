import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainMenu from "./Pages/MainMenu/MainMenu.jsx";
import CreateGame from "./Pages/CreateGame/CreateGame.jsx";
import Lobby from "./Pages/Lobby/Lobby.jsx";
import Game from "./Pages/Game/Game.jsx";
import "./App.scss";

// Initializing database
const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={MainMenu} />
          <Route
            path="/create-game/:gameID-:uid"
            exact
            component={CreateGame}
          />
          <Route path="/lobby/:gameID-:uid" exact component={Lobby} />
          <Route path="/game/:gameID-:uid" exact component={Game} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
