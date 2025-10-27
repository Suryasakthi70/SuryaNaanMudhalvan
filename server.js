const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

const users = [
  { id: 1, name: "John Doe", email: "user@example.com", password: "password123" }
];

const SECRET_KEY = "mysecret";

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token, user });
});

// Register
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);
  res.json({ message: "User Registered", user: newUser });
});

// Get Profile
app.get("/profile", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    const user = users.find(u => u.id === decoded.id);
    res.json({ user });
  });
});

// Update Profile
app.put("/profile", (req, res) => {
  const { email, name, password } = req.body;
  const user = users.find(u => u.email === email);
  if (user) {
    user.name = name;
    user.password = password;
    res.json({ success: true, user });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(3500, () => {
  console.log("Server running on http://localhost:3500");
});