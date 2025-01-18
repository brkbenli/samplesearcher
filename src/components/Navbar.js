import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../photos/logo.png';
import { ImHome } from 'react-icons/im';
import { FaWpexplorer } from 'react-icons/fa';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <div className='navbar'>
      {/* Left Side */}
      <div>
        <img src={logo} alt='Logo' className='logo' />
      </div>

      {/* Center Menu */}
      <div className='menu'>
        <ul className='flex items-center px-0'>
          <li className='mr-4'>
            <Link to='/home'>
              <ImHome className='w-8 h-8' />
            </Link>
          </li>
          <li className='mr-4'>
            <Link to='/explore'>
              <FaWpexplorer className='w-8 h-8'/>
            </Link>
          </li>
        </ul>
      </div>

      
    </div>
  );
};

export default Navbar;
