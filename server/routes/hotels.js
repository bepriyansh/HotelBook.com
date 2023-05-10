import Express from "express";
import hotel from "../models/hotel.js";
const router = Express.Router();


// CREATE 
router.post('/create', async (req, res) => {
    const newHotel = new hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        console.log(error);
    }
})
// UPDATE
router.put('/update/:id', async (req, res) => {

    try {
        const updatedHotel = await hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedHotel);
    } catch (error) {
        console.log(error);
    }
})

// DELETE
router.delete('/delete/:id', async (req, res) => {

    try {
        await hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted.");
    } catch (error) {
        console.log(error);
    }
})

// GET
router.get('/:id', async (req, res) => {

    try {
        const foundhotel = await hotel.findById(req.params.id);
        res.status(200).json(foundhotel);
    } catch (error) {
        console.log(error);
    }
})

// GETALL
router.delete('/hotels', async (req, res) => {

    try {
        const hotels = await hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        console.log(error);
    }
})


export default router;