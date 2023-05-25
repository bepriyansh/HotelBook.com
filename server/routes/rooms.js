import Express from "express";
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verification.js";
const router = Express.Router();



// CREATE 
router.post('/:access_token/:hotelId', verifyAdmin, createRoom);

// READ All
router.get('/', getAllRooms);

// READ One by Id
router.get('/:hotelId/:id', getRoom);

// UPDATE Room
router.patch('/:access_token/:id', verifyAdmin, updateRoom);

// UPDATE Room Availability
router.patch('/availability/:id', updateRoomAvailability);

// DELETE
router.delete('/:access_token/:hotelId/:id', verifyAdmin, deleteRoom);

export default router;