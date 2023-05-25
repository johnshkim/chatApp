import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/hello.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome to the force, <span>{userName}!</span>
      </h1>
      <h3>To start chatting select a user to talk.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  h1 {
    padding-top: 2rem;
  }
  h1 {
    padding-top: 1rem;
  }
  span {
    color: #00B0DF;
  }
`;
