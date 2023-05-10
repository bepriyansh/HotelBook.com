import Express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const app = Express();
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import roomRoutes from "./routes/rooms.js";
import hotelRoutes from "./routes/hotels.js";
dotenv.config();

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => { console.log("Disconnected"); });

ConnectDB();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//middleware
app.use(Express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/room', roomRoutes);
app.use('/hotel', hotelRoutes);

app.listen(8080, () => {
    console.log('Connected to Backend')
})