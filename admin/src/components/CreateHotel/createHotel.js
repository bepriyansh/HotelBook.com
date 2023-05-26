import axios from 'axios';
import React, { useState } from 'react';
import './createHotel.css';



const CreateHotel = () => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        city: '',
        address: '',
        distance: '',
        photos: [],
        title: '',
        description: '',
        rating: 0,
        rooms: [],
        cheapestPrice: 0,
        featured: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('/api/hotels', formData);
        console.log(response);
        // Reset the form after submission
        setFormData({
            name: '',
            type: '',
            city: '',
            address: '',
            distance: '',
            photos: [],
            title: '',
            description: '',
            rating: 0,
            rooms: [],
            cheapestPrice: 0,
            featured: false,
        });
    };

    return (
        <div className="create-hotel">
             <h2 className="create-hotel__title">Create a Hotel</h2>
            <form className="create-hotel__form" onSubmit={handleSubmit}>
                <label className="create-hotel__label" htmlFor="name">Name:</label>
                <input className="create-hotel__input" type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                <label className="create-hotel__label" htmlFor="type">Type:</label>
                <input className="create-hotel__input" type="text" id="type" name="type" value={formData.type} onChange={handleChange} required />

                <label className="create-hotel__label" htmlFor="city">City:</label>
                <input className="create-hotel__input" type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />

                <label className="create-hotel__label" htmlFor="address">Address:</label>
                <input className="create-hotel__input" type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />

                <label className="create-hotel__label" htmlFor="distance">Distance:</label>
                <input className="create-hotel__input" type="text" id="distance" name="distance" value={formData.distance} onChange={handleChange} required />

                <label className="create-hotel__label" htmlFor="photos">Photos:</label>
                <input className="create-hotel__input" type="text" id="photos" name="photos" value={formData.photos} onChange={handleChange} />

                <label className="create-hotel__label" htmlFor="title">Title:</label>
                <input className="create-hotel__input" type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />

                <label className="create-hotel__label" htmlFor="description">Description:</label>
                <textarea className="create-hotel__textarea" id="description" name="description" value={formData.description} onChange={handleChange} required />

                <label className="create-hotel__label" htmlFor="rating">Rating:</label>
                <input className="create-hotel__input" type="number" id="rating" name="rating" min="0" max="5" value={formData.rating} onChange={handleChange} />

                <label className="create-hotel__label" htmlFor="rooms">Rooms:</label>
                <input className="create-hotel__input" type="text" id="rooms" name="rooms" value={formData.rooms} onChange={handleChange} />

                <label className="create-hotel__label" htmlFor="cheapestPrice">Cheapest Price:</label>
                <input className="create-hotel__input" type="number" id="cheapestPrice" name="cheapestPrice" value={formData.cheapestPrice} onChange={handleChange} required />

                <label className="create-hotel__label" htmlFor="featured">Featured:</label>
                <input className="create-hotel__checkbox" type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={(e) => setFormData((prevData) => ({ ...prevData, featured: e.target.checked }))} />

                <button className="create-hotel__button" type="submit">Create</button>
            </form> 
        </div>

    );
};

export default CreateHotel;
