// Import dependencies

const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config(); // Load environment variables

// Initialize Express app
const app = express();

// Enable CORS with options
const corsOptions = {
  origin: "http://localhost:5173/", // Update this to match your front-end URL
  methods: ["GET", "POST"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions)); // Use CORS with options
app.options("*", cors(corsOptions)); // Handle preflight requests

// JSON parsing
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("<center><h1>Welcome to Chatroom API</h1></center>");
});

// OpenAI/Gemini API endpoint and key
const GEMINI_API_URL = "https://api.openai.com/v1/chat/completions";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Ensure this variable is in your .env file

// In-memory message storage (consider using a database in production)
let messages = [];

// Function to get AI response from Gemini API
async function getGeminiAIResponse(message) {
  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        prompt: { text: message },
        max_tokens: 150, // Adjust as needed
      },
      {
        headers: {
          Authorization: `Bearer ${GEMINI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.candidates[0].text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error.message?.data || error.message);
    return "Sorry, I'm having trouble responding right now.";
  }
}

// Endpoint to save a message and get a response
app.post("/api/messages", async (req, res) => {
  const { text } = req.body;
  const userMessage = { sender: "user", text };

  messages.push(userMessage); // Store user message

  try {
    // Send message to Gemini API and get response
    const aiResponseText = await getGeminiAIResponse(text);
    const aiMessage = { sender: "ai", text: aiResponseText };

    messages.push(aiMessage); // Store AI response

    res.json({ response: aiResponseText });
  } catch (error) {
    console.error("Error fetching response:", error);
    res.status(500).json({ error: "Failed to get response" });
  }
});

// Start the server
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
