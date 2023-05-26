import { Link, useNavigate } from 'react-router-dom';
import { baseURL } from '../../baseURL/baseURL';
import Navbar from '../../components/Navbar/navbar';
import useFetch from '../../hooks/useFetch';
import './hotels.css';
import axios from 'axios';
import { useState } from 'react';
import Header from '../../components/Header/header';

const Hotels = () => {
  const navigate = useNavigate();

  const { data, loading, error, reFetch } = useFetch(`${baseURL}/hotel`);
  if (error) { console.log(error) }

  const [alert, setAlert] = useState(false);
  const [id, setId] = useState('');

  const handleOpenDeleteBox = (id) => {
    setId(id);
    setAlert(true);
  }

  const handleDelete = async () => {
    const access_token = localStorage.getItem('access_token');
    try {
      await axios.delete(`${baseURL}/hotel/${access_token}/id/${id}`);
      console.log("Hotel deleted");
      reFetch();
      setId(null);
      setAlert(false);
    } catch (error) {
      console.log(error);
    }
  }
  const handleUpdate = (id) => {
    navigate(`/hotels/update/${id}`);
  }
  const handleCancel = () => {
    setId(null);
    setAlert(false);
    console.log(id,alert);
  }
  return (
    <div className='hotelPage'>
      <Navbar />
      <Header/>
      <div className='content'>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div className='hotelContainer'>
            {data?.map((hotel) => (
              <div className='hotelCard' key={hotel._id}>
                <Link className='hotelImageWrapper' to='/'>
                  <img
                    className='hotelImage'
                    src={hotel.photos[0] || 'https://cdn3.iconfinder.com/data/icons/map/500/hotel-512.png'}
                    alt=''
                  />
                </Link>
                <Link to='/' className='infoContainer'>
                  <div className='hotelName'>{hotel.name}</div>
                  <div className='hotelType'>{hotel.type}</div>
                  <div className='hotelTitle'>{hotel.title}</div>
                  <div className='hotelAddress'>{hotel.address}</div>
                </Link>
                <div className='buttonContainer'>
                  <button onClick={() => handleUpdate(hotel._id)} className='updateButton'>
                    Update
                  </button>
                  <button onClick={() => handleOpenDeleteBox(hotel._id)} className='deleteButton'>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {alert && (
        <div className='deleteBox'>
          <div className='deleteBoxWrapper'>
            <p className='alert'>Do you want to delete?</p>
            <p className='smallAlert'>This can't be undone.</p>
            <div className='buttonContainerWrapper'>
            <div className='buttonContainer'>
              <button onClick={() => handleDelete()} className='deleteButton'>
                Delete
              </button>
              <button onClick={() => handleCancel()} className='cancelButton'>
                No
              </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}

export default Hotels