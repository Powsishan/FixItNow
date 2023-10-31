import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const BookedService = () => {
  const storedUsername = localStorage.getItem('u_username');

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/user-bookings?u_username=${storedUsername}`)
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
         
        </TableRow>
      </TableHead>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.username}>
            <TableCell>{booking.username}</TableCell>
            <TableCell>{booking.booking_date}</TableCell>
            <TableCell>{booking.booking_time}</TableCell>
            <TableCell>{booking.message}</TableCell>
          
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
 );
        }

export default BookedService;
