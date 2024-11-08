import React from "react";
import { useNavigate } from "react-router-dom";  // Using useNavigate for React Router v6

const UserDashboard = () => {
  const navigate = useNavigate();  // Hook for navigation

  // Handle chat button click
  const handleChatButtonClick = () => {
    navigate("/Chatroom");  // Navigate to the chat route
  };

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      
      {/* Chat with AI button */}
      <button onClick={handleChatButtonClick}>Chat with AI</button>
    </div>
  );
};

export default UserDashboard;
