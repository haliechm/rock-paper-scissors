import React from "react";


const GameContext = React.createContext({
    hoveringChoice: "hovering_question_mark",
    clickedChoice: "hovering_question_mark",

    changeHoveringChoice: () => {},
    changeClickedChoice: () => {},
});

export default GameContext;