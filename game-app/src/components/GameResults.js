import React, { useContext } from "react";
import {GameContext} from "../util";

export default function GameResults() {
    const gameContext = useContext(GameContext);

    const result = gameContext.numWins > gameContext.numLosses ? "WINNER" : gameContext.numWins === gameContext.numLosses ? "DRAW!" : "LOSER";

    return (
        <h1>{result}</h1>
    );
}