import './navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbarContainer'>
        <Link to='/' className='logo'>HotelBook.com</Link>
        <div className='navItems'>
          <button className='navButton'>Register</button>
          <button className='navButton'>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar