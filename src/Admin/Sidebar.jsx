import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  BsGrid1X2Fill, BsPeopleFill,
  BsMenuButtonWideFill,
  BsPersonCircle, BsTools,
} from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [popupTableVisible, setPopupTableVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [adminData, setAdminData] = useState({
    name: 'Mr.K',
    email: 'admin@email.com',
    mobile: '0777777777',
  });

  const showPopupTable = () => {
    setPopupTableVisible(true);
  };

  const hidePopupTable = () => {
    setPopupTableVisible(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Handle saving the edited data here, e.g., send a request to update the server.
    setIsEditing(false);
  };
  return (
    <aside id="Sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-header'>
          <div className='sidebar-brand'>
           
          </div>
        </div>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <a href="#">
           
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="#" onClick={showPopupTable}>
           
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="#" onClick={showPopupTable}>
           
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="#" onClick={showPopupTable}>
           
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="#" onClick={showPopupTable}>
           
          </a>
        </li>
      </ul>

      {popupTableVisible && (
        <div className="admin-card">
          <div className="admin-card-content">
            <img src="admin.jpg" alt="Admin" />
            <h2>{adminData.name}</h2>
            <p>Admin</p>
            <p>Contact: {adminData.email}</p>
            <p>Mobile: {adminData.mobile}</p>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={adminData.name}
                  onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
                />
                <input
                  type="text"
                  value={adminData.email}
                  onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                />
                <input
                  type="text"
                  value={adminData.mobile}
                  onChange={(e) => setAdminData({ ...adminData, mobile: e.target.value })}
                />
                <button onClick={handleSaveClick}>Save</button>
              </div>
            ) : (
              <div>
                <button onClick={hidePopupTable}>Close</button> {' '} {' '}
                <button onClick={handleEditClick}>Edit</button>
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}

Sidebar.propTypes = {
  openSidebarToggle: PropTypes.bool.isRequired,
  OpenSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
