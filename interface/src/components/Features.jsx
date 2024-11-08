// frontend/src/components/Features.js

import React from "react";
import styled from "styled-components";

const FeaturesContainer = styled.section`
  padding: 4rem 1rem;
  background-color: #f7f7f7;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: #3d0301; /* Dark color from your palette */
  }

  .feature-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;

    .feature {
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      padding: 2rem;
      width: 300px; /* Adjust width as necessary */
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-5px);
      }

      h3 {
        margin-bottom: 1rem;
        color: #b03052; /* Color from your palette */
      }

      p {
        color: #555; /* Dark grey for text */
      }
    }
  }
`;

const Features = () => {
  const featureData = [
    {
      title: "User Authentication",
      description: "Secure login and signup process for user verification.",
    },
    {
      title: "Real-Time Messaging",
      description: "Instant delivery and reception of messages.",
    },
    {
      title: "File Sharing",
      description: "Easily share images, documents, and media files.",
    },
    {
      title: "Private and Group Chats",
      description: "Engage in one-on-one chats or participate in group discussions.",
    },
  ];

  return (
    <FeaturesContainer>
      <h2>Our Features</h2>
      <div className="feature-list">
        {featureData.map((feature, index) => (
          <div key={index} className="feature">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </FeaturesContainer>
  );
};

export default Features;