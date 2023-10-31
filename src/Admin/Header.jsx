// Import the necessary components
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';

function Header({ openSidebarToggle }) {
  const adminName = "Admin";
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={openSidebarToggle} />
      </div>
      <div className='header-search'>
        <input
          type='text'
          placeholder='Search...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <BsSearch className='search-icon' />
      </div>
      <div className='header-right'>
        <BsFillBellFill className='icon' />
        <BsFillEnvelopeFill className='icon' /> {/* Corrected usage */}
        <div className='dropdown'>
          <span className='admin-name' onClick={toggleDropdown}>
            {adminName}
          </span>
          <BsPersonCircle className='icon' onClick={toggleDropdown} />
          {showDropdown && (
            <div className='dropdown-menu'>
              <a href='/homepage'>Homepage</a>
              <a href='/logout'>Logout</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  openSidebarToggle: PropTypes.func.isRequired,
};

Header.defaultProps = {
  openSidebarToggle: () => {}, 
};

export default Header;
