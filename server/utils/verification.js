import jwt from "jsonwebtoken";
import { createError } from "./createError.js";

export const verifyToken = (req, res, next) => {

    const token = req.cookies.access_token;
    if (!token)
        return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
        if (error) return next(createError(403, "Token is not valid"));
        req.user = user;
        next();
    });
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "Unauthorized"));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "Unauthorized"));
        }
    });
};