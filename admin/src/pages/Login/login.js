import { useContext, useState } from 'react';
import './login.css';
import { AuthContext } from '../../Context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../baseURL/baseURL';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });
    const navigate = useNavigate();
    const { loading, error, dispatch } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState(error);

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(`${baseURL}/auth/login`, credentials);
            if (res.data.success) {
                localStorage.setItem("access_token", res.data.access_token);
                try {
                    const userInfo = await axios.get(`${baseURL}/user/userInfo/${res.data.access_token}/${res.data.userId}`);
                    if (!userInfo.data.isAdmin) {
                        setErrorMessage({ message: "Unauthorized" });
                        localStorage.setItem('access_token',null);
                    } else {
                        dispatch({ type: "LOGIN_SUCCESS", payload: userInfo.data });
                        console.log(userInfo.data);
                        navigate('/hotels');
                    }
                } catch (error) {
                    console.log(error);
                }
            }

        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
            console.log(error);
        }
    };
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    return (
        <div className='login'>
            <div className='loginContainer'>
                <p>Login</p>
                <input onChange={handleChange} type='text' placeholder='username' className='loginInput' id='username' />
                <input onChange={handleChange} type='password' placeholder='password' className='loginInput' id='password' />
                {errorMessage && <span className='errorMessage'>{errorMessage.message}</span>}
                <button disabled={loading} onClick={handleClick} className='loginButton'>Login</button>
            </div>
        </div>
    )
}

export default Login