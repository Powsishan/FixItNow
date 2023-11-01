import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ServiceProvidersTable() {
  const [doneData, setDoneData] = useState(null);
  const [serviceproviderprofile, setServiceProviders] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/approvedserviceprovider')
      .then((response) => {
        setServiceProviders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const handleDone = (data) => {
    setDoneData(data);
  
    Axios.post('http://localhost:3001/api/saveAndDeleteData', data)
      .then((response) => {
        // Handle the response if needed
        console.log('Data saved and deleted successfully:', response.data);
        toast.success('Data saved and deleted successfully', {
          position: 'top-right',
          autoClose: 3000, // Optional: Close the toast after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        // After successful save and delete, fetch the updated data from approvedserviceprovider
        Axios.get('http://localhost:3001/api/approvedserviceprovider')
          .then((getResponse) => {
            // Update the service providers data in your state
            setServiceProviders(getResponse.data);
          })
          .catch((getErr) => {
            console.error('Error fetching data from approvedserviceprovider: ', getErr);
          });
      })
      .catch((error) => {
        console.error('Error saving and deleting data: ', error);
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
            Axios.delete(`http://localhost:3001/api/approvedserviceprovider/${ID}`)
              .then(() => {
                // Refresh the provider list after deletion
                Axios.get('http://localhost:3001/api/approvedserviceprovider')
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
      <h3>Request Service Providers Details</h3>
      
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
                <button className="blue-button" onClick={() => handleDone(provider)}>
                    <DoneIcon /> 
                  </button> 
                  <button className="red-button" onClick={() => handleDelete(provider.ID)}>
                    <DeleteIcon /> 
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
     
    </div>
  );
}

export default ServiceProvidersTable;
