import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createBoard, getBoards } from '../controllers/boardController.js';


const router = express.Router();

router.route('/')
    .post(protect, createBoard)
    .get(protect, getBoards)

export default router;