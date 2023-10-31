import React, { useState,useEffect } from 'react';
import './App.css';
import EditForm from './EditFormhome';
import Axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import confirmAlert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import styles



function HomeOwnersTable() {
  const [editData, setEditData] = useState(null);
  const [users, setHomeOwners] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/users')
      .then((response) => {
        setHomeOwners(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);


  const handleEdit = (data1) => {
    setEditData(data1);
  };

  const handleCancelEdit = () => {
    setEditData(null);
  };

  const handleSaveEdit = (editedData) => {
    Axios.put(`http://localhost:3001/api/users/${editedData.ID}`, editedData)
    .then((response) => {
      console.log('Data updated:', response.data1);
      setEditData(null);
      // Fetch the updated data again if needed
      Axios.get('http://localhost:3001/api/users')
        .then((response) => {
          setHomeOwners(response.data); 
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        });
    })
    .catch((error) => {
      console.error('Error updating data: ', error);
    });
  };
  const handleDelete = (ID) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this Home owner?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            Axios.delete(`http://localhost:3001/api/users/${ID}`)
              .then(() => {
                // Refresh the provider list after deletion
                Axios.get('http://localhost:3001/api/users')
                  .then((response) => {
                    setHomeOwners(response.data);
                  })
                  .catch((error) => {
                    console.error('Error fetching data: ', error);
                  });
              })
              .catch((error) => {
                console.error('Error deleting data: ', error);
              });
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div className="service-provider-details"> {/* Changed the class name to 'service-provider-details' */}
      <h3>Home Owners Details</h3>
      {editData ? (
        <EditForm data1={editData} onSave={handleSaveEdit} onCancel={handleCancelEdit} />
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>U_Name</th>
              <th>First Name</th>
              <th>Last Name </th>
              <th>Mobile Number</th>
              <th>Email</th>
              <th>NIC</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((owner) => (
              <tr key={owner.ID}>
                <td>{owner.ID}</td>
                <td>{owner.u_username}</td>
                <td>{owner.firstName}</td>
                <td>{owner.lastName}</td>
                <td>{owner.mobileNumber}</td>
                <td>{owner.email}</td>  
                <td>{owner.NICnumber}</td>
                <td>{owner.address}</td>  
                
                <td>
                  <button className="blue-button" onClick={() => handleEdit(owner)}>
                    Edit
                  </button>{' '}
                  <button className="red-button"onClick={() => handleDelete(owner.ID)}>
                  Delete
                 </button>
                </td> 
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}


export default HomeOwnersTable;
