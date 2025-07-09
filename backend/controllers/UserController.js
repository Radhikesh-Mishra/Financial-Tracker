import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET; 

const registerUser = async (req, res) => {
  const { username, email, password, phone } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, phone, password: hashedPassword });
    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id, name: savedUser.username, email: savedUser.email }, JWT_SECRET, { expiresIn: '4h' });

    const { password: _, ...userWithoutPassword } = savedUser._doc;
    console.log(savedUser);

    res.status(201).json({ message: "User registered successfully", token, user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, name: user.username, email: user.email }, JWT_SECRET, { expiresIn: '4h' });

    const { password: _, ...userWithoutPassword } = user._doc;
    console.log(userWithoutPassword);

    res.status(200).json({ message: "Login successful", token, user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in user" });
  }
};

const setLimit = async (req, res) => {
  const { limit, userId } = req.body;
console.log("Setting budget limits:", limit, "for user:", userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    for (const [category, value] of Object.entries(limit)) {
      if (user.budget[category]) {
        user.budget[category].limit = value;
      } else {
        user.budget[category] = { limit: value, spent: 0 };
      }
    }
console.log(user);
    await user.save();
    res.status(200).json({
      message: "Budget limits updated successfully",
      budget: user.budget,
    });
  } catch (error) {
    console.error("Error updating budget limits:", error);
    res.status(500).json({ message: "Error updating budget limits" });
  }
};


export { registerUser, loginUser, setLimit };
