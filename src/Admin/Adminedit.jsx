import React, { useState } from 'react';
import './App.css';


const AdminEditForm = () => {
  const [editedData, setEditedData] = useState({
    name: 'Mr.K',
    email: 'admin@email.com',
    mobile: '0777777777',
  });

  const handleSaveClick = () => {
    // Handle saving the edited data here, e.g., send a request to update the server.
  };

  return (
    <div className="admin-edit-form">
      <h2>Edit Admin</h2>
      <input
        type="text"
        value={editedData.name}
        onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
      />
      <input
        type="text"
        value={editedData.email}
        onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
      />
      <input
        type="text"
        value={editedData.mobile}
        onChange={(e) => setEditedData({ ...editedData, mobile: e.target.value })}
      />
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
};

export default AdminEditForm;
