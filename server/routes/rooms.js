import Express from "express";
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, updateRoomAvailability } from "../controllers/room.js";
const router = Express.Router();

// CREATE 
router.post('/:hotelId', createRoom);

// READ All
router.get('/', getAllRooms);

// READ One by Id
router.get('/:id', getRoom);

// UPDATE Room
router.patch('/:id', updateRoom);

// UPDATE Room Availability
router.patch('/:id', updateRoomAvailability);

// DELETE
router.delete('/:hotelId/:id', deleteRoom);

export default router;