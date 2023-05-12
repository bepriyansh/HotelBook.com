import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/createError.js';
// import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    console.log("Controllers Folder (auth.js");
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


// export const login = async (req, res, next) => {
//     const { username, password } = req.body;

//     try {
//         const user = await User.findOne({ username });
//         if (!User)
//             return next(createError(404, 'User Not Found'));


//         const isValidUser = await bcrypt.compare(password, user.password);
//         if (!isValidUser)
//             return next(createError(400, "Wrong Password"));

//         const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin },
//             process.env.JWT_SECRET_KEY
//         );
//         res.cookie("access_token", token, {
//             httpOnly: true
//         }).status(201).json({ message: 'Logged in successfully' });
//     } catch (error) {
//         next(error);
//     }
// };
