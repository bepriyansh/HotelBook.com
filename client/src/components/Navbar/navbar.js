import { useState, useEffect, useContext } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/authContext';

const Navbar = () => {
  const {user} = useContext(AuthContext);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (user !== null && user) {
      setUsername(user.user.username);
    }
  }, [username]);

  return (
    <div className='navbar'>
      <div className='navbarContainer'>
        <Link to='/' className='logo'>HotelBook.com</Link>
        <div className='navItems'>
          {!username && <>
            <button className='navButton'>Register</button>
            <Link to='/login' className='navButton'>Login</Link>
          </>
          }
          {username && <button className='navButton'>Hello <b>{username}</b></button>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
