import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

// File path to data.json
const filePath = path.join(__dirname, "../data.json");

// Function to read data from the JSON file
const readData = () => {
  const fileContent = fs.readFileSync(filePath);
  return JSON.parse(fileContent);
};

// Function to write data to the JSON file
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); // Indented format
};

// Hello users
router.get("/hello", (req, res) => {
  res.send("Hello users");
});

// List all users
router.get("/", (req, res) => {
  const users = readData();
  res.json({ message: "List of all users", users });
});

// Get user by ID
router.get("/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const users = readData();
  const user = users.find((u) => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

// Add a new user
router.post("/", (req, res) => {
  const newUser = req.body;
  if (!newUser.id || !newUser.name || !newUser.email) {
    return res.status(400).send("Missing required fields: id, name, or email");
  }
  const users = readData();
  users.push(newUser); // Add the new user
  writeData(users); // Write updated users back to data.json
  res.status(201).json({ message: "User added successfully", user: newUser });
});

export default router;
