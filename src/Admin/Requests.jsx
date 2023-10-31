import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Axios from 'axios'; // Import Axios for making API requests

function Requests({ requests }) {
  const handleAccept = (requestData) => {
    // Send a request to your Express API to save the data
    Axios.post('http://localhost:3001/api/serviceProviders', requestData)
      .then((response) => {
        // Data saved successfully, you can handle any further actions here
        console.log('Data saved:', response.data);
      })
      .catch((error) => {
        console.error('Error saving data: ', error);
      });
  };
  return (
    <div className="service-provider-details">
      <h3> Requests Details</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>NIC</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((Requests) => (
            <tr key={Requests.id}>
              <td>{Requests.id}</td>
              <td>{Requests.name}</td>
              <td>{Requests.nic}</td>
              <td>{Requests.mobileNumber}</td>
              <td>{Requests.email}</td>
              <td>
                <button
                  className="blue-button"
                  onClick={() => handleAccept(Requests)}
                >
                  Accept
                </button>{' '}
                <button className="red-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
Requests.propTypes = {
  requests: PropTypes.array.isRequired,
};

export default Requests;
