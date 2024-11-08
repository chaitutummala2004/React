// frontend/src/components/Footer.js

import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  padding: 2rem;
  background-color: ${(props) => props.theme.colors.backgroundDark};
  color: ${(props) => props.theme.colors.dark};
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const LinksSection = styled.div`
  margin-bottom: 1rem;

  h4 {
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.colors.accent};
  }

  a {
    display: block;
    color: ${(props) => props.theme.colors.secondary};
    text-decoration: none;
    margin-bottom: 0.3rem;
    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

const SubscribeSection = styled.div`
  h4 {
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.colors.accent};
  }

  input {
    padding: 0.5rem;
    border: 1px solid ${(props) => props.theme.colors.light};
    border-radius: 3px;
    outline: none;
    margin-right: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: ${(props) => props.theme.colors.secondary};
    border: none;
    color: #fff;
    font-weight: bold;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      background-color: ${(props) => props.theme.colors.primary};
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <LinksSection>
        <h4>Quick Links</h4>
        <a href="/">Home</a>
        <a href="/register">Register</a>
        <a href="/contact">Contact</a>
      </LinksSection>
      <SubscribeSection>
        <h4>Subscribe for Updates</h4>
        <form>
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </SubscribeSection>
    </FooterContainer>
  );
};

export default Footer;
