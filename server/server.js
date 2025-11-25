import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

//Load environment variables
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//Test Route
app.get("/", (req,res) => {
    res.send("Kanban API is running...");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
});
