import Express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import roomRoutes from "./routes/rooms.js";
import hotelRoutes from "./routes/hotels.js";
import { errorHandler } from "./utils/errorHandler.js";
// import { ConnectDB } from "./utils/connectDB.js";

const app = Express();
// ConnectDB();
import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => { console.log("Disconnected"); });
mongoose.connection.on("connected", () => { console.log("Connected to MongoDB"); });

ConnectDB();

//middleware
app.use(cookieParser)
app.use(Express.json());

console.log("Index.js runs")
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/room', roomRoutes);
app.use('/hotel', hotelRoutes);

app.use(errorHandler);

app.listen(8080, () => {
    console.log('Connected to Backend')
})