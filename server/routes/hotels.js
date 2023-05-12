import express from 'express';
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from '../controllers/hotel.js';

const router = express.Router();

// CREATE operation
console.log("Route folder")
router.post('/', createHotel);

// READ All
router.get('/', getHotels);

// READ One by Id
router.get('/:id', getHotel);

// UPDATE
router.patch('/:id', updateHotel);

// DELETE
router.delete('/:id', deleteHotel);

export default router;