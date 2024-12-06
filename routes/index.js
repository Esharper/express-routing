import express from "express";
import mainRoutes from "./routes/index.js";
import userRoutes from "./routes/users.js";  // Import the user routes

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/", mainRoutes);   // Main routes
app.use("/users", userRoutes);   // User-specific routes

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
