import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/createError.js';

export const register = async (req, res, next) => {

    var { username, email, password, isAdmin } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password);
    password = hash;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user document
        const user = new User({ username, email, password, isAdmin });

        // Save new user to the database
        await user.save();

        // Send response with success message
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {

    var { username, email, password, isAdmin } = req.body;

    try {
        const User = await User.findOne({ username });
        if (!User) {
            return next(createError(404, 'User Not Found'));
        }

        const isValidUser = await bcrypt.compare(password, User.password);
        if (!isValidUser) {
            return next(createError(400, "Wrong Password"));
        }
        res.status(201).json({ message: 'Logged in successfully' });
    } catch (error) {
        next(error);
    }
};
