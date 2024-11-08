// components/AboutUs.js
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  text-align: center;
`;

const AboutUs = () => {
  return (
    <Container>
      <h2>About Us</h2>
      <p>Welcome to Chatroom! We aim to provide an interactive chat experience with AI.</p>
      <p>Our mission is to make communication fun and seamless.</p>
    </Container>
  );
};

export default AboutUs;
