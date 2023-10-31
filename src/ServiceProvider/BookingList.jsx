import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const BookingList = () => {
  const storedUsername = localStorage.getItem('username');

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/bookings?username=${storedUsername}`)
      .then(response => {
        // Format date and time here
        const formattedBookings = response.data.map(booking => {
          const formattedDate = new Date(booking.booking_date).toLocaleDateString(); // Modify the format as needed

          return {
            ...booking,
            booking_date: formattedDate,
           
          };
        });

        setBookings(formattedBookings);
      })
      .catch(error => {
        console.error('Error fetching booking data:', error);
      });
  }, [storedUsername]);

  return (
    <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Booked User</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>Message</TableCell>
          <TableCell>Contact Number</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.u_username}>
            <TableCell>{booking.u_username}</TableCell>
            <TableCell>{booking.booking_date}</TableCell>
            <TableCell>{booking.booking_time}</TableCell>
            <TableCell>{booking.message}</TableCell>
            <TableCell>{booking.contactnumber}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
 );
        }

export default BookingList;
