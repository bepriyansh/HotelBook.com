import axios from 'axios';
import { baseURL } from '../../baseURL/baseURL';
import CreateHotel from '../../components/CreateHotel/createHotel';
import Header from '../../components/Header/header';
import Navbar from '../../components/Navbar/navbar';
import useFetch from '../../hooks/useFetch';
import './dashboard.css';
import { useEffect } from 'react';

const Dashboard = () => {

  const { data } = useFetch(`${baseURL}/user/totalusers/${localStorage.getItem('access_token')}`);
  

  const getData = async () => {
    try {
      const newUsers = await axios.get(`${baseURL}/user/newusers/${localStorage.getItem('access_token')}`);
      const totalUsers = await axios.get(`${baseURL}/user/totalusers/${localStorage.getItem('access_token')}`);
      const bookingCount = await axios.get(`${baseURL}/room/bookings/token/${localStorage.getItem('access_token')}`);
      console.log("newUsers = ", await newUsers.data.count);
      console.log("totalUsers = ", await totalUsers.data.count);
      console.log("bookingCount = ", await bookingCount.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  
  return (
    <div>
      <Navbar />
      <Header />
      <div className='container'>
        {/* <CreateHotel /> */}
        Total users = {data.count}
      </div>
    </div>
  )
}

export default Dashboard