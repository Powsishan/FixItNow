import React, { useState, useEffect } from 'react';
import './App.css';
import EditForm from './EditForm';
import Axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ServiceProvidersTable() {
  const [editData, setEditData] = useState(null);
  const [serviceproviderprofile, setServiceProviders] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/serviceproviderprofile')
      .then((response) => {
        setServiceProviders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const handleEdit = (data) => {
    setEditData(data);
  };

  const handleCancelEdit = () => {
    setEditData(null);
  };

  const handleSaveEdit = (editedData) => {
    Axios.put(`http://localhost:3001/api/serviceproviderprofile/${editedData.ID}`, editedData)
      .then((response) => {
        console.log('Data updated:', response.data);
        setEditData(null);
        // Fetch the updated data again if needed
        Axios.get('http://localhost:3001/api/serviceproviderprofile')
          .then((response) => {
            setServiceProviders(response.data);
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
      message: 'Are you sure you want to delete this provider?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            Axios.delete(`http://localhost:3001/api/serviceproviderprofile/${ID}`)
              .then(() => {
                // Refresh the provider list after deletion
                Axios.get('http://localhost:3001/api/serviceproviderprofile')
                  .then((response) => {
                    setServiceProviders(response.data);
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
    <div className="service-provider-details">
      <h3>Service Providers Details</h3>
      {editData ? (
        <EditForm data={editData} onSave={handleSaveEdit} onCancel={handleCancelEdit} />
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mobile Number</th>
              <th>Email</th>
              <th>NIC</th>
              <th>Address</th>
              <th>job Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {serviceproviderprofile.map((provider) => (
              <tr key={provider.ID}>
                <td>{provider.ID}</td>
                <td>{provider.firstName}</td>
                <td>{provider.lastName}</td>
                <td>{provider.mobileNumber}</td>
                <td>{provider.email}</td>
                <td>{provider.NICnumber}</td>
                <td>{provider.address}</td>
                <td>{provider.JobTitle}</td>
                <td>{provider.Description}</td>
                <td>
                <button className="blue-button" onClick={() => handleEdit(provider)}>
                    <EditIcon /> 
                  </button> 
                  <button className="red-button" onClick={() => handleDelete(provider.ID)}>
                    <DeleteIcon /> 
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

export default ServiceProvidersTable;
