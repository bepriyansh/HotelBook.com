import Express from "express";
import Hotel from "../models/hotel.js";
const router = Express.Router();


// CREATE 
router.post('/create', async (req, res) => {
    const newHotel = new Hotel(req.body);

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
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedHotel);
    } catch (error) {
        console.log(error);
    }
})

// DELETE
router.delete('/delete/:id', async (req, res) => {

    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted.");
    } catch (error) {
        console.log(error);
    }
})

// GET
router.get('/:id', async (req, res) => {

    try {
        const foundhotel = await Hotel.findById(req.params.id);
        res.status(200).json(foundhotel);
    } catch (error) {
        console.log(error);
    }
})

// GETALL
router.get('/hotels', async (req, res) => {

    try {
        const hotels = await Hotel.find({});
        res.status(200).json(hotels);
    } catch (error) {
        console.log(error);
    }
})


export default router;