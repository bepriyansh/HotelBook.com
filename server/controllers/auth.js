import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { createError } from '../utils/createError.js';
// import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    var { username, password, ...otherDetails } = req.body;
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password);

    try {

        const existingUser = await User.findOne({ username });
        if (existingUser)
            return res.status(400).json({ message: 'User already exists' });


        const user = new User({ username, password, ...otherDetails });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        next(error);
    }
};


export const login = async (req, res, next) => {

    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user)
            return next(createError(404, 'User Not Found'));

        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword)
            return next(createError(400, "Wrong Password"));

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET_KEY
        );

        const { password, isAdmin, ...userOtherDetails } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(201).json({ message: 'Logged in successfully', user: userOtherDetails });

    } catch (error) {
        next(error);
    }
};
