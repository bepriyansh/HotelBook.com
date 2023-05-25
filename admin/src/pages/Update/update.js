import { useParams } from 'react-router-dom';
import { baseURL } from '../../baseURL/baseURL';
import Navbar from '../../components/Navbar/navbar';
import useFetch from '../../hooks/useFetch';
import './update.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateRoom from '../../components/UpdateRoom/updateRoom';

const Update = () => {
    const { hotelId } = useParams();
    const { data, loading, error, reFetch } = useFetch(`${baseURL}/hotel/id/${hotelId}`);
    // console.log(data);

    if (error) { console.log(error) }
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [city, setCity] = useState('');
    const [title, setTitle] = useState('');
    const [distance, setDistance] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(data.rating);
    const [cheapestPrice, setCheapestPrice] = useState('');
    const [featured, setFeatured] = useState('');


    useEffect(() => {
        setName(data.name);
        setType(data.type);
        setCity(data.city);
        setTitle(data.title);
        setDistance(data.distance);
        setAddress(data.address);
        setDescription(data.description);
        setRating(data.rating);
        setCheapestPrice(data.cheapestPrice);
        setFeatured(data.featured);

    }, [data]);


    const handleChangeName = (e) => {
        setName(e.target.value);
    }
    const handleChangeType = (e) => {
        setType(e.target.value);
    }
    const handleChangeCity = (e) => {
        setCity(e.target.value);
    }
    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleChangeDistance = (e) => {
        setDistance(e.target.value);
    }
    const handleChangeAddress = (e) => {
        setAddress(e.target.value);
    }
    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    }
    const handleChangeRating = (e) => {
        setRating(e.target.value);
    }
    const handleChangeCheapestPrice = (e) => {
        setCheapestPrice(e.target.value);
    }



    const [alert, setAlert] = useState(false);
    const handleOpenUpdateBox = () => {
        setAlert(true);
    }
    const handleUpdate = async () => {
        const access_token = localStorage.getItem('access_token');
        try {
            await axios.patch(`${baseURL}/hotel/${access_token}/id/${hotelId}`, {
                name,
                type,
                city,
                title,
                distance,
                address,
                description,
                rating,
                cheapestPrice,
                featured
            });
            console.log("Hotel updated successfully");
            reFetch();
            setAlert(false);
        } catch (error) {
            console.log(error);
        }
    }
    const handleCancel = () => {
        setAlert(false);
    }

    return (
        <div className='updatePage'>
            <Navbar />
            {loading ? <h1>Loading...</h1> :
                <div className='updateContainerWrapper'>
                    <div className='title'>Update hotel info...</div>
                    <div className='updateContainer'>
                        <div className='updateInputs'>
                            <div className='inputFields'>
                                <label>Name : </label>
                                <input type='text' value={name} onChange={handleChangeName} />
                            </div>

                            <div className='inputFields'>
                                <label>Type : </label>
                                <input type='text' value={type} onChange={handleChangeType} />
                            </div>

                            <div className='inputFields'>
                                <label>City : </label>
                                <input type='text' value={city} onChange={handleChangeCity} />
                            </div>

                            <div className='inputFields'>
                                <label>Title : </label>
                                <input type='text' value={title} onChange={handleChangeTitle} />
                            </div>

                            <div className='inputFields'>
                                <label>Distance : </label>
                                <input type='text' value={distance} onChange={handleChangeDistance} />
                            </div>

                            <div className='inputFields'>
                                <label>Address : </label>
                                <textarea type='text' value={address} onChange={handleChangeAddress} />
                            </div>

                            <div className='inputFields'>
                                <label>Description : </label>
                                <textarea value={description} onChange={handleChangeDescription} />
                            </div>

                            <div className='inputFields'>
                                <label>CheapestPrice : </label>
                                <input type='number' value={cheapestPrice} onChange={handleChangeCheapestPrice} />
                            </div>

                            <div className='bottomField'>
                                <div className='inputFields'>
                                    <label>Ratings : </label>
                                    <input id='rating' type='number' min={0} max={5} value={rating} onChange={handleChangeRating} />
                                </div>

                                <div className='inputFields'>
                                    <label>Featured : </label>
                                    <input type='checkbox' id='checkBox' checked={featured} onClick={() => setFeatured(!featured)} />
                                </div>
                            </div>
                        </div>
                        <div className='updateButtonWrapper'>
                            <p className='updateText'>Update Now : </p>
                            <button onClick={() => handleOpenUpdateBox()} className='updateButton'>Update</button>
                            <button onClick={() => handleCancel()} className='cancelButton'>Cancel</button>
                        </div>
                    </div>

                    {data.rooms.length!==0 && <div className='title'>Update room info...</div>}
                    {
                        data.rooms.map((roomId,i) => (<UpdateRoom hotelId={hotelId} roomId={roomId} i={i} key={i} />))
                    }
                </div>
            }
            {alert &&
                <div className='deleteBox'>
                    <div className='deleteBoxWrapper'>
                        <p className='alert'>Do you want to update?</p>
                        <p className='smallAlert'>This can't be undone.</p>
                        <div className='buttonContainer'>
                            <button onClick={() => handleUpdate()} className='updateButton'>Update</button>
                            <button onClick={() => handleCancel()} className='cancelButton'>No</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Update