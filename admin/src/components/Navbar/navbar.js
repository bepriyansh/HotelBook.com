import { useState, useEffect, useContext } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/authContext';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (user !== null && user) {
      setUsername(user.username);
    }
  }, [user, username]);

  return (
    <div className='navbar'>
      <div className='navbarContainer'>
        <Link to='/' className='logo'>HotelBook.com</Link>
        <div className='navItems'>
          {!username && <>
            <Link to='/signUp' className='navButton'>Register</Link>
            <Link to='/login' className='navButton'>Login</Link>
          </>
          }
          {username && <Link to={`/admin/${user._id}`} className='navButton-userLogo'>
            <img
              className='userLogoButton'
              src={user.profilePicture}
              alt='' />
          </Link>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
