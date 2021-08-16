import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "../util";
import { rock, paper, scissors, question_mark } from "../images";

export default function GameBox(props) {
  const gameContext = useContext(GameContext);

//   const [image, setImage] = useState(question_mark);

  function changeShownImage() {
    if (props.userBox) {
      switch (gameContext.hoveringChoice) {
        case "hovering_rock":
          props.setImage(rock);
          break;
        case "hovering_paper":
          props.setImage(paper);
          break;
        case "hovering_scissors":
          props.setImage(scissors);
          break;
        default:
          props.setImage(question_mark);
      }
    }
  }

  function changeClickedImage() {
    if (props.userBox) {
      switch (gameContext.clickedChoice) {
        case "hovering_rock":
          props.setImage(rock);
          break;
        case "hovering_paper":
          props.setImage(paper);
          break;
        case "hovering_scissors":
          props.setImage(scissors);
          break;
        default:
          props.setImage(question_mark);
      }
    }
  }

  useEffect(() => {
    changeShownImage();
  }, [gameContext.hoveringChoice]);

  useEffect(() => {
    changeClickedImage();
  }, [gameContext.clickedChoice]);

  return (
    <div>
      <img src={props.image} alt="current choice" width="70%" className="mt-3"></img>
    </div>
  );
}
