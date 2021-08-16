import React, { useState, useContext } from "react";
import { GameContext } from "../util";
import { rock, paper, scissors } from "../images";

export default function ChoiceBoxes(props) {
  const gameContext = useContext(GameContext);
//   const [choice, setChoice] = useState("");

  function enter(e) {
    // gameContext.hoveringChoice = e.currentTarget.id;
    if (props.userBoxes) {
      gameContext.changeHoveringChoice(e.currentTarget.id);
      if (gameContext.clickedChoice === "hovering_question_mark") {
        e.currentTarget.style.backgroundColor = "#FB2625";
      }
    }
  }

  function leave(e) {
    gameContext.changeHoveringChoice(gameContext.clickedChoice);
    if (gameContext.clickedChoice === "hovering_question_mark") {
      e.currentTarget.style.backgroundColor = "rgb(221, 221, 221)";
    }
  }

  function click(e) {
    if (props.userBoxes) {
      gameContext.changeClickedChoice(e.currentTarget.id);
      props.setChoice(e.currentTarget.id);
    }
  }

  return (
    <div className="choice-boxes-container">
      <div
        className="choice-box rock-choice-boxes"
        id="hovering_rock"
        onMouseEnter={(e) => enter(e)}
        onMouseLeave={(e) => leave(e)}
        onClick={(e) => click(e)}
        style={{
          backgroundColor: props.choice
            ? props.choice == "hovering_rock"
              ? "#FB2625"
              : "rgb(221,221,221)"
            : props.opponentChoice == "hovering_rock"
            ? "#FB2625"
            : "rgb(221,221,221)",
        }}
      >
        <img src={rock} alt="rock" width="95%"></img>
      </div>
      <div
        className="choice-box paper-choice-boxes"
        id="hovering_paper"
        onMouseEnter={(e) => enter(e)}
        onMouseLeave={(e) => leave(e)}
        onClick={(e) => click(e)}
        style={{
          backgroundColor: props.choice
            ? props.choice == "hovering_paper"
              ? "#FB2625"
              : "rgb(221,221,221)"
            : props.opponentChoice == "hovering_paper"
            ? "#FB2625"
            : "rgb(221,221,221)",
        }}
      >
        <img src={paper} alt="rock" width="80%"></img>
      </div>
      <div
        className="choice-box scissors-choice-boxes"
        id="hovering_scissors"
        onMouseEnter={(e) => enter(e)}
        onMouseLeave={(e) => leave(e)}
        onClick={(e) => click(e)}
        style={{
          backgroundColor: props.choice
            ? props.choice == "hovering_scissors"
              ? "#FB2625"
              : "rgb(221,221,221)"
            : props.opponentChoice == "hovering_scissors"
            ? "#FB2625"
            : "rgb(221,221,221)",
        }}
      >
        <img src={scissors} alt="rock" width="85%"></img>
      </div>
    </div>
  );
}
