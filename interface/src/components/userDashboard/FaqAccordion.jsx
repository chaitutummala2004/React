import React, { useState } from "react";
import axios from "axios";

const FaqAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAccordionToggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click on the 'Sign Up' button and follow the prompts to register.",
    },
    {
      question: "Can I start a private chat?",
      answer: "Yes, simply click on a user's profile and select 'Start Private Chat'.",
    },
    {
      question: "Are my messages secure?",
      answer: "Yes, all messages are encrypted to ensure privacy and security.",
    },
    {
      question: "How do I enable notifications?",
      answer: "Go to 'Settings' and toggle the notification preferences.",
    }
];

  // Function to handle sending the user query to ChatGPT
  const sendMessageToChatGPT = async () => {
    if (!userMessage.trim()) return;

    setIsLoading(true);
    const chatInput = {
      model: "gpt-3.5-turbo", // You can use gpt-4 as well if needed
      messages: [{ role: "user", content: userMessage }],
    };

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions", // OpenAI API endpoint
        chatInput,
        {
          headers: {
            Authorization: `Bearer YOUR_API_KEY`, // Replace with your actual API key
            "Content-Type": "application/json",
          },
        }
      );

      const assistantMessage = response.data.choices[0].message.content;

      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: "user", content: userMessage },
        { role: "assistant", content: assistantMessage },
      ]);
    } catch (error) {
      console.error("Error sending message to ChatGPT:", error);
    } finally {
      setIsLoading(false);
      setUserMessage('');
    }
  };

  return (
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div className="faq-item" key={index}>
          <div
            className="faq-question"
            onClick={() => handleAccordionToggle(index)}
          >
            {faq.question}
          </div>
          {index === activeIndex && (
            <div className="faq-answer">{faq.answer}</div>
          )}
        </div>
      ))}

      {/* Chat Section */}
      
    </div>
  );
};

export default FaqAccordion;
