import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../util";

export default function GameResults(props) {
  const gameContext = useContext(GameContext);

  const [result, setResult] = useState("");
  console.log("!!!!", gameContext);

  useEffect(() => {
    console.log("getting here!!!!");
    console.log(gameContext);
    setResult(
      gameContext.numWins > gameContext.numLosses
        ? "WINNER"
        : gameContext.numWins === gameContext.numLosses
        ? "DRAW!"
        : "LOSER"
    );
  }, [gameContext]);

  console.log("wins!!", gameContext.numWins);
  console.log("draws!!", gameContext.numDraws);
  console.log("losses!!", gameContext.numLosses);
  // let result = gameContext.numWins > gameContext.numLosses ? "WINNER" : gameContext.numWins === gameContext.numLosses ? "DRAW!" : "LOSER";

  return <h1>{result}</h1>;
}
