import React from "react";
import { Container, Row, Col } from "reactstrap";
import { rock, paper, scissors } from "../images";
import { bounceInRight, bounceInDown, bounceInUp } from "react-animations";
import Radium, { StyleRoot } from "radium"; // this is required only to work with the animations library :(

const styles = {
  bounceInRight: {
    animation: "x 4s",
    animationName: Radium.keyframes(bounceInRight, "bounceInRight"),
  },
  bounceInDown: {
    animation: "x 5s",
    animationName: Radium.keyframes(bounceInDown, "bounceInDown"),
  },
  bounceInUp: {
    animation: "x 6s",
    animationName: Radium.keyframes(bounceInUp, "bounceInLeft"),
  },
};

export default function Home(props) {
  // want to just render home page and then onclick render game page
  return (
    <StyleRoot>
      <Container className="center">
        <Row>
          <Col></Col>
          <Col xs={10} id="top-row">
            <h1 style={{ fontSize: "350%" }}>WELCOME TO</h1>
            <img
              src={rock}
              alt="rock"
              className="home-screen-img"
              style={styles.bounceInRight}
            />
            <img
              src={paper}
              alt="paper"
              className="home-screen-img"
              style={styles.bounceInDown}
            />
            <img
              src={scissors}
              alt="scissors"
              className="home-screen-img"
              style={styles.bounceInUp}
            />
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col xs={10} id="second-row">
            <a href="/game"><i className="bi bi-arrow-right-circle-fill"></i></a>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </StyleRoot>
  );
}
