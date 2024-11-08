import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useAuth } from "../contexts/UserContext"; // Importing authentication context

// Styled Components
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 3rem auto;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const MessageContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background-color: #f0f0f0;
  border-radius: 5px;
  max-height: 400px;
  margin-bottom: 1rem;
`;

const Message = styled.div`
  margin-bottom: 0.5rem;
  ${({ isUser }) =>
    isUser &&
    `
    text-align: right;
    font-weight: bold;
    color: #333;
  `}
`;

const InputContainer = styled.div`
  display: flex;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 1rem;
`;

const SendButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;

const Chatroom = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { authState } = useAuth(); // Access auth token if needed

  // Send the user's message to the chat
  const sendUserMessage = () => {
    const userMessage = { sender: "user", text: message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setMessage("");
  };

  // Send message to the local API
  const sendAIMessage = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/sendMessage", // Change to your local API URL
        { message },
        { headers: { Authorization: `Bearer ${authState.token}` } }
      );
      const aiMessage = { sender: "ai", text: response.data.response };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error sending message to local API:", error);
    }
  };

  // Send message to the Gemini API (replace with correct API key and URL)
  const sendGeminiMessage = async () => {
    try {
      const geminiResponse = await axios.post(
        `https://api.openai.com/v1/chat/completions`,
        {
          prompt: message, // Assuming the message is passed as prompt
          model: "gpt-4",   // Use the appropriate model
        },
        {
          headers: {
            "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiGeminiMessage = {
        sender: "ai-gemini",
        text: geminiResponse.data.choices[0].message.content,
      };
      setMessages((prevMessages) => [...prevMessages, aiGeminiMessage]);
    } catch (error) {
      console.error("Error sending message to Gemini API:", error.response || error);
    }
  };

  // Send both user and AI (Gemini) messages
  const sendMessage = async () => {
    if (message.trim() === "") return;

    sendUserMessage();
    await sendAIMessage();
    await sendGeminiMessage();
  };

  return (
    <ChatContainer>
      <h2>Chatroom</h2>

      <MessageContainer>
        {messages.map((msg, index) => (
          <Message key={index} isUser={msg.sender === "user"}>
            <strong>{msg.sender === "user" ? "You" : msg.sender === "ai" ? "AI" : "AI Gemini"}:</strong> {msg.text}
          </Message>
        ))}
      </MessageContainer>

      <InputContainer>
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <SendButton onClick={sendMessage}>Send</SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default Chatroom;
