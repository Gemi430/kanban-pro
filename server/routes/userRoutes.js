import express from "express";
import { registerUser, authUser } from "../controllers/userController.js";

const router = express.Router();

//Post request to /api/users/register
router.post('/register', registerUser);
router.post('/login', authUser);

export default router;