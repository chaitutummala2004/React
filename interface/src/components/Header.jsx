import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons"; // Updated icon
import { NavLink } from "react-router-dom";
import Logout from "./Logout";
import { useAuth } from "../contexts/UserContext"; // Import the useAuth hook

// Styled components
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2.5rem; // Slightly increased padding
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;
  transition: all 0.3s ease-in-out;

  ${(props) =>
    props.issticky &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      background-color: ${(props) => props.theme.colors.primary};
    `}
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem; // Increased font size for better visibility
  font-weight: bold;
  color: ${(props) => props.theme.colors.secondary};

  .icon {
    margin-right: 1rem;
    font-size: 2.5rem; // Increased icon size
    color: ${(props) => props.theme.colors.secondary};
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  a {
    margin-left: 2rem; // Increased spacing between links
    color: ${(props) => props.theme.colors.dark};
    text-decoration: none;
    font-weight: 500;
    font-size: 1.2rem; // Adjust font size
    transition: color 0.3s;

    &:hover {
      color: ${(props) => props.theme.colors.secondary};
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    
    a {
      margin-left: 0;
      margin-top: 1rem;
    }
  }
`;

// Main Header component
const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const { authState } = useAuth(); // Access authState from UserContext

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the scroll listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HeaderContainer issticky={isSticky}>
      <Logo>
        <FontAwesomeIcon icon={faHome} className="icon" /> {/* Updated icon */}
        Chatroom
      </Logo>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/About">About</NavLink>
        <NavLink to="/ContactUs">Contact</NavLink>
        <NavLink to="/Chatroom">Chatroom</NavLink>
        {!authState.token ? ( // Check if the user is not authenticated
          <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        ) : (
          // User is authenticated
          <>
            <NavLink to="/user/dashboard">Dashboard</NavLink>
            <Logout to="/" /> {/* Render the Logout component */}
          </>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
