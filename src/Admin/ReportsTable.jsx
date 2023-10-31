import React, { useState,useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import confirmAlert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import styles

function ReportsTable() {
 
  const [bookings, setBooking] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/bookings')
      .then((response) => {
        setBooking(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);


  const handleDelete = (booking_id) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this Home owner?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            Axios.delete(`http://localhost:3001/api/bookings/${booking_id}`)
              .then(() => {
                // Refresh the provider list after deletion
                Axios.get('http://localhost:3001/api/bookings')
                  .then((response) => {
                    setBooking(response.data);
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
      <h3>Appointment Details</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Booking time </th>
            <th>Booking date </th>
            <th>Username </th>
            <th>Messages </th>
            <th>Contact Number </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((report) => (
            <tr key={report.booking_id}>
              <td>{report.booking_id}</td>
              <td>{report.username}</td>
              <td>{report.booking_time}</td>
              <td>{report.booking_date}</td>
              <td>{report.u_username}</td>
              <td>{report.message}</td>
              <td>{report.contactnumer}</td>
              <td>
              <td>
                  <button className="red-button"onClick={() => handleDelete(report.booking_id)}>
                  Delete
                 </button>
              </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




export default ReportsTable;
