import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';

const Header = () => {
    const location = useLocation();

    return (
        <div className='header'>
            <nav>
                <ul>
                    <li className={location.pathname === '/' ? 'active' : ''}>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li className={location.pathname === '/hotels' ? 'active' : ''}>
                        <Link to="/hotels">Hotels</Link>
                    </li>
                    <li className={location.pathname === '/users' ? 'active' : ''}>
                        <Link to="/users">Users</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
