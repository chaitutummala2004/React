// frontend/src/components/Landing.js

import React from "react";
import styled from "styled-components";
import backgroundImage from "../assets/img/image.png"; // Update with your actual image path

const LandingContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
  background: url(${backgroundImage}) no-repeat center center/cover;
  text-align: center;
  padding: 0 1rem;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }

  button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 5px;
    background-color: #b03052; /* Use a color from your palette */
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #d76c82; /* Use a lighter shade for hover */
    }
  }
`;

const Landing = () => {
  return (
    <LandingContainer>
      <h1>Welcome to my chatroom</h1>
      <p>Chat with me</p>
      <button>Get Started</button>
    </LandingContainer>
  );
};

export default Landing;
