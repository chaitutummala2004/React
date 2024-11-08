import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"; // Import styled-components for styling

const DashboardHeaderContainer = styled.div`
  background-color: #f5f5f5; /* Light background for the header */
  padding: 2rem 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 2rem;
`;

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  color: #3d0301; /* Dark red color */
  margin-bottom: 1rem;
`;

const ChatButton = styled.button`
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  color: #fff;
  background-color: #b03052; /* Dark red button color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  
  /* Hover effect */
  &:hover {
    background-color: #a0274b; /* Slightly darker on hover */
    transform: translateY(-3px); /* Lift effect on hover */
  }

  /* Focus effect */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #a0274b;
  }
`;

const DashboardHeader = () => {
  const { authState } = useContext(UserContext);
  const navigate = useNavigate();

  // Function to handle Chatroom button click
  const goToChatroom = () => {
    navigate("/Chatroom");
  };

  return (
    <DashboardHeaderContainer>
      <HeaderTitle>Welcome, {authState.user.name}!</HeaderTitle>
      {/* Chatroom Button */}
      <ChatButton onClick={goToChatroom}>Chat with AI</ChatButton>
    </DashboardHeaderContainer>
  );
};

export default DashboardHeader;
