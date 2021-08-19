import React, { useState, useContext, useEffect } from "react";
import { fadeInUp, fadeInRight, fadeInDown } from "react-animations";
import Radium, { StyleRoot } from "radium"; // this is required only to work with the animations library
import { rock, paper, scissors, question_mark } from "../images";
import { GameContext } from "../util";
import { ChoiceBoxes, GameBox } from "./";
import { Button } from "reactstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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
  const gameContext = useContext(GameContext);
  const [results, setResults] = useState("");
  const [userCorrectImage, setUserCorrectImage] = useState(question_mark);
  const [opponentCorrectImage, setOpponentCorrectImage] =
    useState(question_mark);
  const [choice, setChoice] = useState("");
  const [opponentChoice, setOpponentChoice] = useState("");
  const [buttonText, setButtonText] = useState("SHOOT!");

  let opponentInt = -1;
  let iterator = -1;

  function buttonClicked() {
    buttonText === "SHOOT!" ? shootButtonClicked() : nextRoundButtonClicked();
  }

  function nextRoundButtonClicked() {
    gameContext.changeHoveringChoice("hovering_question_mark");
    gameContext.changeClickedChoice("hovering_question_mark");
    setUserCorrectImage(question_mark);
    setOpponentCorrectImage(question_mark);
    setChoice("");
    setOpponentChoice("");
    setButtonText("SHOOT!");
  }

  function shootButtonClicked() {
    // turn gamecontext clicked into int
    let userInt = convertToInt(gameContext.clickedChoice);
    opponentInt = Math.floor(Math.random() * 3); // returns random integer from 0 to 2
    iterator = opponentInt == 2 ? 0 : opponentInt + 1;
    let resultInt = userInt - opponentInt;

    // used for countdown
    setTimeout(() => setResults(3), 0);
    setTimeout(() => setResults(2), 1000);
    setTimeout(() => setResults(1), 2000);

    // used for iteration
    iterateChoiceBoxes();

    
    setTimeout(() => getEndResults(resultInt, opponentInt), 3200);
  }

  let counter = 3000;
  function iterateChoiceBoxes() {
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
    // gets results of game after 3 seconds
    if (resultInt === 0) {
      // THIS IS WORKING HERE BUT CONTEXT IN GAMERESULTS IS NOT WORKING CORRECTLY
      setResults("Draw!");
      gameContext.changeNumDraws(++gameContext.numDraws);
      console.log("Num draws: ", gameContext.numDraws);
    } else if (resultInt === -2 || resultInt === 1) {
      setResults("Win!");
      gameContext.changeNumWins(++gameContext.numWins);
      console.log("Num wins: ", gameContext.numWins);
    } else {
      setResults("Loss!");
      gameContext.changeNumLosses(++gameContext.numLosses);
      console.log("Num losses: ", gameContext.numLosses);
    }

    setOpponentCorrectImage(getOpponentImage(opponentInt));

    // reset button shows up in place of shoot button
    setButtonText("NEXT");
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
          <Button
            // onClick={shootButtonClicked}
            onClick={buttonClicked}
            id="shoot-button"
            style={{
              visibility:
                gameContext.clickedChoice === "hovering_question_mark"
                  ? "hidden"
                  : "visible",
            }}
          >
            {buttonText}
          </Button>
          <p className="score wins">{`Wins: ${gameContext.numWins}`}</p>
          <p className="score draws">{`Draws: ${gameContext.numDraws}`}</p>
          <p className="score losses">{`Losses: ${gameContext.numLosses}`}</p>

          {/* <a href="game-results" className="end-game-button" title="end game"> */}
          <Link to="game-results" className="end-game-button" title="end game">
            <i className="bi bi-arrow-right-circle-fill end-game-button"></i>
          </Link>
          {/* </a> */}
        </div>
      </div>
    </StyleRoot>
  );
}
