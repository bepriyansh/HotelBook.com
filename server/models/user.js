import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
    },
    name: {
      type: String,  
    },
    phone: {
        type: Number,
    },
    bookedRooms:[{hotelId:String, roomId: String, date:{type:[Date]}}],
    isAdmin: {
        type: Boolean,
        default: false,
    },
},{timestamps: true});

export default mongoose.model('User', UserSchema, 'UserCollection');