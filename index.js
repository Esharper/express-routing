import express from "express";
import mainRoutes from "./routes/index.js";
import userRoutes from "./routes/users.js";

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Use the routers
app.use("/", mainRoutes); // Main routes
app.use("/users", userRoutes); // User-specific routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
