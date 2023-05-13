import Hotel from '../models/hotel.js';

// CREATE operation
export const createHotel = async (req, res, next) => {
    try {
        const newHotel = new Hotel(req.body);
        await newHotel.save();
        res.status(201).json(newHotel);
    } catch (error) {
        next(error);
    }
};

// READ operation to fetch all hotels
export const getHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find({});
        res.json(hotels);
    } catch (error) {
        next(error);
    }
};

// READ operation to fetch a single hotel by ID
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.json(hotel);
    } catch (error) {
        next(error);
    }
};

// UPDATE operation
export const updateHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.json(hotel);
    } catch (error) {
        next(error);
    }
};

// DELETE operation
export const deleteHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.json({ message: 'Hotel deleted successfully' });
    } catch (error) {
        next(error);
    }
};



export const getHotelCountByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
      const countList = await Promise.all(
        cities.map((city) => {
          return Hotel.countDocuments({ city: city });
        })
      );
      res.status(200).json(countList);
    } catch (error) {
        next(error);
    }
};
