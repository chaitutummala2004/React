import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios"; // Import axios

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  align-items: center;
  padding: 2rem;
  background-color: ${(props) => props.theme.colors.light}; // Light background
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.colors.dark};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid ${(props) => props.theme.colors.secondary};
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    outline: none;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.875rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  margin-top: 1rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    regNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error when user modifies input
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};
    const { name, email, password, regNumber } = formData;

    if (!name.trim()) {
      newErrors.name = "Full Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email Address is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (!regNumber.trim()) {
      newErrors.regNumber = "Registration Number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        setLoading(true); // Show loading spinner
        const response = await axios.post(
          "https://vercel.com/sruthi-bajjuris-projects/react-k2ju",
          formData
        );
        setSuccessMessage(response.data.message);
        setLoading(false);

        // Clear the form or reset the state as needed
        setFormData({
          name: "",
          email: "",
          password: "",
          regNumber: "",
        });
      } catch (error) {
        setLoading(false); // Hide loading spinner
        console.error("Error occurred during registration:", error);

        if (error.response) {
          // Server responded with a status other than 2xx
          setErrors({ submit: error.response.data.message });
        } else {
          // Other errors (like network issues)
          setErrors({
            submit: "An unexpected error occurred. Please try again.",
          });
        }
      }
    }
  };

  return (
    <RegisterContainer>
      <Title>Register</Title>
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

        <Input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

        <Input
          type="text"
          name="regNumber"
          placeholder="Registration Number"
          value={formData.regNumber}
          onChange={handleChange}
          required
        />
        {errors.regNumber && <ErrorMessage>{errors.regNumber}</ErrorMessage>}

        <Button type="submit" disabled={loading}>
          {loading ? <Spinner /> : "Register"}
        </Button>
      </Form>
    </RegisterContainer>
  );
};

export default Register;
