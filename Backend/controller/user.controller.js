import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js";

export const signup = async (req, res) => {
    const { fullname, email, password, confirmPassword } = req.body;
    try {
        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User already registered" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            fullname,
            email,
            password: hashPassword,
        });

        await newUser.save();

        // If user is created successfully, generate a token and set cookie
        if (newUser) {
            createTokenAndSaveCookie(newUser._id, res);
            return res.status(201).json({ message: "User created successfully",  
                user: {
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
            }, });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists and password is correct
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: "Invalid user credentials" });
        }

        // Create token and set cookie
        createTokenAndSaveCookie(user._id, res);

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
    try {
        // Clear the JWT cookie on logout
        res.clearCookie("jwt");
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
export const allUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Errors in allUsers Controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
