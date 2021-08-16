import "./App.scss";
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Home, Game, GameResults } from "./components";
import { GameContext } from "./util";

function App() {
  const [hoveringChoice, setHoveringChoice] = useState(
    "hovering_question_mark"
  );
  const [clickedChoice, setClickedChoice] = useState("hovering_question_mark");
  const [numWins, setNumWins] = useState(0);
  const [numLosses, setNumLosses] = useState(0);
  const [numDraws, setNumDraws] = useState(0);

  const GameContextValues = {
    hoveringChoice: hoveringChoice,
    changeHoveringChoice: setHoveringChoice,
    clickedChoice: clickedChoice,
    changeClickedChoice: setClickedChoice,
    numWins: numWins,
    changeNumWins: setNumWins,
    numLosses: numLosses,
    changeNumLosses: setNumLosses,
    numDraws: numDraws,
    changeNumDraws: setNumDraws,
  };

  return (
    <GameContext.Provider value={GameContextValues}>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="/game" component={Game}></Route>
          <Route exact path="/game-results" component={GameResults}></Route>
        </Switch>
      </div>
    </GameContext.Provider>
  );
}

export default App;
