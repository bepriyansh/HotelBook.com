import Express from "express";
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verification.js";
const router = Express.Router();



// CREATE 
router.post('/:hotelId', verifyAdmin, createRoom);

// READ All
router.get('/', getAllRooms);

// READ One by Id
router.get('/:hotelId/:id', getRoom);

// UPDATE Room
router.patch('/:id', verifyAdmin, updateRoom);

// UPDATE Room Availability
router.patch('/availability/:id', updateRoomAvailability);

// DELETE
router.delete('/:hotelId/:id', verifyAdmin, deleteRoom);

export default router;