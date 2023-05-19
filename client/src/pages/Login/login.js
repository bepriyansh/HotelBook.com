import { useContext, useState } from 'react';
import './login.css';
import { AuthContext } from '../../Context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });
 
    const navigate = useNavigate();
    const {user, loading, error, dispatch } = useContext(AuthContext);

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({type:"LOGIN_START"});
        try {
            const res = await axios.post("/auth/login",credentials);
            dispatch({type:"LOGIN_SUCCESS",payload:res.data});
            navigate('/');
        } catch (error) {
            dispatch({type:"LOGIN_FAILURE", payload: error.response.data});
        }
    };
    const handleChange = (e) => {
        setCredentials((prev)=>({...prev, [e.target.id]:e.target.value}));
    };
    return (
        <div className='login'>
            <div className='loginContainer'>
                <p>Login</p>
                <input onChange={handleChange} type='text' placeholder='username' className='loginInput' id='username' />
                <input onChange={handleChange} type='password' placeholder='password' className='loginInput' id='password' />
            {error && <span className='errorMessage'>{error.message}</span>}
                <button disabled={loading} onClick={handleClick} className='loginButton'>Login</button>
            </div>
        </div>
    )
}

export default Login