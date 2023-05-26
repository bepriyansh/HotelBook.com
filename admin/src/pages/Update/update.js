import { useParams } from 'react-router-dom';
import { baseURL } from '../../baseURL/baseURL';
import Navbar from '../../components/Navbar/navbar';
import useFetch from '../../hooks/useFetch';
import './update.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateRoom from '../../components/CrudRoom/updateRoom';
import CreateRoom from '../../components/CrudRoom/createRoom';

const Update = () => {
    const { hotelId } = useParams();
    const { data, loading, reFetch } = useFetch(`${baseURL}/hotel/id/${hotelId}`);
    // console.log(data);

    const [hotelData, setHotelData] = useState({
        name: '',
        type: '',
        city: '',
        title: '',
        distance: '',
        address: '',
        description: '',
        rating: 0,
        cheapestPrice: '',
        featured: false
    });

    useEffect(() => {
        if (data) {
            setHotelData(data);
        }
        reFetch();
    }, [data]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setHotelData((prevData) => ({
            ...prevData,
            [name]: inputValue
        }));
    };

    const [alert, setAlert] = useState(false);
    const handleOpenUpdateBox = () => {
        setAlert(true);
    }
    const handleUpdate = async () => {
        const access_token = localStorage.getItem('access_token');
        try {
            await axios.patch(`${baseURL}/hotel/${access_token}/id/${hotelId}`, hotelData);
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
                                <input type='text' name='name' value={hotelData.name} onChange={handleInputChange} />
                            </div>

                            <div className='inputFields'>
                                <label>Type : </label>
                                <input type='text' name='type' value={hotelData.type} onChange={handleInputChange} />
                            </div>

                            <div className='inputFields'>
                                <label>City : </label>
                                <input type='text' name='city' value={hotelData.city} onChange={handleInputChange} />
                            </div>

                            <div className='inputFields'>
                                <label>Title : </label>
                                <input type='text' name='title' value={hotelData.title} onChange={handleInputChange} />
                            </div>

                            <div className='inputFields'>
                                <label>Distance : </label>
                                <input type='text' name='distance' value={hotelData.distance} onChange={handleInputChange} />
                            </div>

                            <div className='inputFields'>
                                <label>Address : </label>
                                <textarea type='text' name='address' value={hotelData.address} onChange={handleInputChange} />
                            </div>

                            <div className='inputFields'>
                                <label>Description : </label>
                                <textarea name='description' value={hotelData.description} onChange={handleInputChange} />
                            </div>

                            <div className='inputFields'>
                                <label>CheapestPrice : </label>
                                <input type='number' name='cheapestPrice' value={hotelData.cheapestPrice} onChange={handleInputChange} />
                            </div>

                            <div className='bottomField'>
                                <div className='inputFields'>
                                    <label>Ratings : </label>
                                    <input id='rating' type='number' min={0} max={5} name='rating' value={hotelData.rating} onChange={handleInputChange} />
                                </div>

                                <div className='inputFields'>
                                    <label>Featured : </label>
                                    <input type='checkbox' id='checkBox' name='featured' checked={hotelData.featured} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>
                        <div className='updateButtonWrapper'>
                            <p className='updateText'>Update Now : </p>
                            <button onClick={() => handleOpenUpdateBox()} className='updateButton'>Update</button>
                            <button onClick={() => handleCancel()} className='cancelButton'>Cancel</button>
                        </div>
                    </div>

                    <div className='title'>Create Room</div>
                    <CreateRoom hotelId={hotelId}/>
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
                        <div className='buttonContainerWrapper'>
                        <div className='buttonContainer'>
                            <button onClick={() => handleUpdate()} className='updateButton'>Update</button>
                            <button onClick={() => handleCancel()} className='cancelButton'>No</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Update