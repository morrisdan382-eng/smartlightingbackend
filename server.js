import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// ROUTES
import roomRoutes from "./routes/roomRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Load env
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/rooms", roomRoutes);
app.use("/api/users", userRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Smart Lighting Backend Running...");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((error) => console.log("MongoDB Error:", error));
