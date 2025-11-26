import express from "express";
import { registerUser, authUser, getUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//Post request to /api/users/register
router.post('/register', registerUser);
router.post('/login', authUser);
// Apply the 'protect' middleware here. Only requests with a valid token will reach getUserProfile.
router.route('/profile').get(protect, getUserProfile);

export default router;