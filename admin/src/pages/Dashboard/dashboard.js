import CreateHotel from '../../components/CreateHotel/createHotel';
import Header from '../../components/Header/header';
import Navbar from '../../components/Navbar/navbar';
import './dashboard.css';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className='container'>
        <CreateHotel />
      </div>
    </div>
  )
}

export default Dashboard