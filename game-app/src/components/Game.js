import React, { useState, useContext, useEffect } from "react";
import { fadeInUp, fadeInRight, fadeInDown } from "react-animations";
import Radium, { StyleRoot } from "radium"; // this is required only to work with the animations library
import { rock, paper, scissors, question_mark } from "../images";
import { GameContext } from "../util";
import { ChoiceBoxes, GameBox } from "./";
import { Button } from "reactstrap";

const styles = {
  fadeInUp: {
    animation: "x 3s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
  fadeInRight: {
    animation: "x 4s",
    animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
  },
  fadeInDown: {
    animation: "x 5s",
    animationName: Radium.keyframes(fadeInDown, "fadeInDown"),
  },
};

export default function Game(props) {
  const numWins = 4;

  const gameContext = useContext(GameContext);
  const [results, setResults] = useState("");
  const [userCorrectImage, setUserCorrectImage] = useState(question_mark);
  const [opponentCorrectImage, setOpponentCorrectImage] =
    useState(question_mark);
  const [choice, setChoice] = useState("");
  const [opponentChoice, setOpponentChoice] = useState("");

  let opponentInt = -1;
  let iterator = -1;
  function shootButtonClicked() {
    // turn gamecontext clicked into int
    let userInt = convertToInt(gameContext.clickedChoice);
    opponentInt = Math.floor(Math.random() * 3); // returns random integer from 0 to 2
    console.log("OPPONENT INT: ", opponentInt);
    iterator = opponentInt == 2 ? 0 : opponentInt + 1;
    console.log("ITERATOR: ", iterator);
    let resultInt = userInt - opponentInt;

    // used for countdown
    setTimeout(() => setResults(3), 0);
    setTimeout(() => setResults(2), 1000);
    setTimeout(() => setResults(1), 2000);

    // used for iteration
    iterateChoiceBoxes();

    setTimeout(() => getEndResults(resultInt, opponentInt), 3300);

    // display 3 2 1 in results
    // display correct picture in each box
    // display win/lose/draw in results
    // update scoreboard
    // reset button shows up in place of shoot button
  }

  let counter = 3000;
  function iterateChoiceBoxes() {
    console.log("ITERATOR: ", iterator);
    const choices = ["hovering_rock", "hovering_paper", "hovering_scissors"];
    const choiceImages = [rock, paper, scissors];

    setOpponentChoice(choices[iterator]);
    setOpponentCorrectImage(choiceImages[iterator]);

    iterator = iterator == 2 ? 0 : (iterator += 1);

    counter = counter - 100;
    if (counter > 0) {
      setTimeout(iterateChoiceBoxes, 100);
    }
  }

  function getEndResults(resultInt, opponentInt) {
    if (resultInt === 0) {
      setResults("Draw!");
    } else if (resultInt === -2 || resultInt === 1) {
      setResults("Win!");
    } else {
      setResults("Loser!");
    }

    setOpponentCorrectImage(getOpponentImage(opponentInt));
  }

  function convertToInt(choice) {
    switch (choice) {
      case "hovering_rock":
        return 0;
      case "hovering_paper":
        return 1;
      case "hovering_scissors":
        return 2;
      default:
        return 100; // should never reach here
    }
  }

  function getOpponentImage(opponentInt) {
    switch (opponentInt) {
      case 0:
        return rock;
      case 1:
        return paper;
      case 2:
        return scissors;
      default:
        return ""; // should never reach here
    }
  }

  return (
    <StyleRoot>
      <div className="grid-container">
        <div className="word rock" style={styles.fadeInUp}>
          R O C K
        </div>
        <div className="word paper" style={styles.fadeInRight}>
          P A P E R
        </div>
        <div className="word scissors" style={styles.fadeInDown}>
          S C I S S O R S
        </div>
        <div className="word main-content main-content-grid">
          <div className="choice-boxes choice-boxes-player">
            <ChoiceBoxes
              userBoxes={true}
              choice={choice}
              setChoice={setChoice}
            />
          </div>
          <div className="choice-boxes choice-boxes-opponent">
            <ChoiceBoxes
              opponentChoice={opponentChoice}
              setOpponentChoice={setOpponentChoice}
            />
          </div>
          <div className="game-box game-box-player">
            <GameBox
              userBox={true}
              image={userCorrectImage}
              setImage={setUserCorrectImage}
            />
          </div>
          <div className="game-box game-box-opponent">
            <GameBox
              className={opponentCorrectImage}
              image={opponentCorrectImage}
              setImage={setOpponentCorrectImage}
            />
          </div>

          <h2 id="result">{results}</h2>
          <Button onClick={shootButtonClicked} id="shoot-button">
            SHOOT!
          </Button>
          <p className="score wins">{`Wins: ${numWins}`}</p>
          <p className="score draws">{`Draws: ${numWins}`}</p>
          <p className="score losses">{`Losses: ${numWins}`}</p>

          <a href="/game-results" className="end-game-button">
            <i className="bi bi-arrow-right-circle-fill end-game-button"></i>
          </a>
        </div>
      </div>
    </StyleRoot>
  );
}
