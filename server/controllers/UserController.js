const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  //console.log(req.body);
  const { name, email, password, regNumber } = req.body;

  try {
    // Create a new user
    const newUser = new User({ name, email, password, regNumber });

    // Save user to the database
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET, // Ensure you have a JWT_SECRET in your .env file
      { expiresIn: "1h" } // Token expiration time
    );

    // Set the token in an HTTP-only cookie
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
      message: "Login successful",
      token, // Return token for authorization in frontend
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Logout
const logoutUser = (req, res) => {
  //console.log("server logout");
  res.cookie("token", "", { expires: new Date(0) });
  return res.status(200).json({ message: "Logout successful" });
};

module.exports = { registerUser, loginUser, logoutUser };
