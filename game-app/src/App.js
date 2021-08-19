import "./App.scss";
import React, { useState, useEffect } from "react";
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

  const GameContextV = {
    hoveringChoice: hoveringChoice,
    changeHoveringChoice: setHoveringChoice,
    clickedChoice: clickedChoice,
    changeClickedChoice: setClickedChoice,
    numWins: numWins,
    changeNumWins: updateWins,
    numLosses: numLosses,
    changeNumLosses: updateLoss,
    numDraws: numDraws,
    changeNumDraws: updateDraws,
  };

  useEffect(() => {
    console.log(GameContext, numLosses, numWins, numDraws);

    return () => console.log("unmounting");
  }, [GameContextV]);

  function updateWins(win) {
    console.log(win, "WIN");
    setNumWins(win);
  }
  function updateLoss(win) {
    console.log(win, "LOSS");
    setNumLosses(win);
  }
  function updateDraws(win) {
    console.log(win, "DRAW");
    setNumDraws(win);
  }
  return (
    <GameContext.Provider value={GameContextV}>
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
