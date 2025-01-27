import express from 'express';
import bcrypt from 'bcrypt'; // For hashing passwords
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

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new User({ name, surname, email, password: hashedPassword });
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

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
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



/* import express from 'express';
import User from '../models/userModel.js';
const router = express.Router();


router.post('/',async(req, res)=>{
    const {name, email, password} = req.body;
    try {
        const newUser = new User({name, email, password});
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.post('/login', async(req, res)=>{
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (user.password !== password) {
            return res.status(400).json({message: 'Invalid email or password'});
        }
        res.json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

export default router; */
