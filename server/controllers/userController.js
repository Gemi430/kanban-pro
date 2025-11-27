import User from "../models/User.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Helper function to generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET), {expiresIn: '30d'}
}


//@desc    Register new user
//@route   POST /api/users/register
//@access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if(userExists) {
            res.status(400).json({ message: 'User already exists'});
            return;
        }
        // Hash the password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await  bycrypt.hash(password, salt);

        //Create and save the User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })
        //respond with user data and token
        if(user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            })
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// @desc    Authenticate a user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check if user exists AND if the password matches the hash
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get user profile data
// @route   GET /api/users/profile
// @access  Private (Requires JWT)
const getUserProfile = async (req, res) => {
  // req.user is available because of the 'protect' middleware!
  if (req.user) {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export { registerUser, authUser, getUserProfile };

