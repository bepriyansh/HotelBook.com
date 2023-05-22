import axios from 'axios';
import Navbar from '../../components/Navbar/navbar';
import './admin.css';
import { baseURL } from '../../baseURL/baseURL';
import { useContext } from 'react';
import { AuthContext } from '../../Context/authContext';

const Admin = () => {
    const { user } = useContext(AuthContext);
    const getUser = async () => {
        try {
            return await axios.get(`${baseURL}/user/${user.user._id}`)

        } catch (error) {
            console.log(error);
        }
    }
    console.log(getUser());
    return (
        <div>
            <Navbar />
        </div>
    )
}

export default Admin