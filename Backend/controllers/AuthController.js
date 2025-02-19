import UserModel from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { email, password, ...rest } = req.body;

        // Check if user already exists
        const oldUser = await UserModel.findOne({ email });
        if (oldUser) {
            return res.status(400).json({ message: 'This user already exists!' });
        }

        // Hash the password
        const hashedPass = await bcrypt.hash(password.toString(), 10);

        // Create a new user instance
        const newUser = new UserModel({ email, password: hashedPass, ...rest });

        // Save user to DB
        const user = await newUser.save();

        // Generate JWT token with email, ID, and user-entered password
        const token = jwt.sign(
            { email: user.email, id: user._id, password }, 
            process.env.TOKEN_KEY, 
            { expiresIn: "7d" }  // Adjust expiration as needed
        );

        res.status(200).json({ user, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}; 

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { email: user.email, id: user._id, password }, // Including password in token as requested
            process.env.TOKEN_KEY,
            { expiresIn: '7d' }
        );

        res.status(200).json({ message: 'Login successful', token, user: { id: user._id, email: user.email } });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};