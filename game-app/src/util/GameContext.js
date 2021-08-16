import React from "react";


const GameContext = React.createContext({
  hoveringChoice: "hovering_question_mark",
  clickedChoice: "hovering_question_mark",
  numWins: 0,
  numLosses: 0,
  numDraws: 0,

  changeHoveringChoice: () => {},
  changeClickedChoice: () => {},
  changeNumWins: () => {},
  changeNumLosses: () => {},
  changeNumDraws: () => {},
});

export default GameContext;