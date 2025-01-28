import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

// Register a new user
router.post('/', async (req, res) => {
    const { name, surname, email, password } = req.body;

    try {
        // Check if the email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use.' });
        }

        // Create and save the new user (without hashing password)
        const newUser = new User({ name, surname, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Compare the password directly
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Return the user info (excluding the password for security)
        res.json({ 
            user: {
                id: user._id,
                name: user.name,
                surname: user.surname,
                email: user.email,
            },
            message: 'Login successful!'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
