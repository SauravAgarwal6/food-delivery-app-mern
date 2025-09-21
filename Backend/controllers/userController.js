import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

// Helper function to create a JWT
const createToken = (id) => {
    // Signs a token with the user's id and a secret key, set to expire in 3 days
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '3d'
    });
}


// /login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // 1. Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please enter all fields." });
        }

        // 2. Find user by email in the database
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist." });
        }

        // 3. Compare provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials." });
        }

        // 4. Create and send a token if credentials are correct
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "An error occurred on the server." });
    }
}

// ## Register User
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // 1. Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User with this email already exists." });
        }

        // 2. Validate email format & password strength
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email." });
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters." });
        }

        // 3. Hash the user's password
        const salt = await bcrypt.genSalt(10); // Generates a salt for hashing
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create a new user document
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        // 5. Save the new user to the database
        const user = await newUser.save();

        // 6. Create a token for the new user
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "An error occurred on the server." });
    }
}

export {loginUser,registerUser}