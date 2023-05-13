import Express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import roomRoutes from "./routes/rooms.js";
import hotelRoutes from "./routes/hotels.js";

import { errorHandler } from "./utils/errorHandler.js";
import { ConnectDB } from "./utils/mongoDB.js";

dotenv.config();
const app = Express();

ConnectDB();

//middleware
app.use(cookieParser());
app.use(Express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/room', roomRoutes);
app.use('/hotel', hotelRoutes);

app.use(errorHandler);

app.listen(8080, () => {
    console.log('Connected to Backend')
})