import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingForm = () => {
    const storedUsername = localStorage.getItem('u_username');
    console.log('Booking user:', storedUsername);
    const { username } = useParams();
    const timeSlots = ["09:00", "11:00", "14:00", "16:00"];
    const [formData, setFormData] = useState({
        booking_date: '',
        booking_time: ''
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [bookedTimeSlots, setBookedTimeSlots] = useState([]);

    useEffect(() => {
        // Fetch booked time slots for the selected service provider and date.
        fetchBookedTimeSlots(username, formData.booking_date);
    }, [username, formData.booking_date]);

    const fetchBookedTimeSlots = async (username, booking_date) => {
        try {
            const res = await axios.get(`http://localhost:3001/booked-slots/${username}/${booking_date}/`);
            if (res && res.data) {
                setBookedTimeSlots(res.data);
            }
        } catch (err) {
            // Handle error while fetching booked time slots.
        }
    };

    const isDateValid = (selectedDate) => {
      const currentDate = new Date();
      const bookingDate = new Date(selectedDate);
      // Compare the selected date with the current date
      return bookingDate >= currentDate;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.booking_date === '' || formData.booking_time === '') {
            toast.error('Please select a date and time slot.');
            return;
        }
        
        if (!isDateValid(formData.booking_date)) {
      toast.error('You can only book for current or future dates.');
      return;
    }


        try {
            const res = await axios.post('http://localhost:3001/book', {

                u_username: storedUsername, // Use storedUsername from local storage
                username,
                booking_date: formData.booking_date,
                booking_time: formData.booking_time,
            });
            if (res && res.data) {
                setConfirmationMessage(res.data.message);
                setOpenDialog(true);
                toast.success(res.data.message);
            } else {
                toast.error('Unexpected response from the server');
            }
        } catch (err) {
            if (err.response && err.response.data) {
                toast.error(err.response.data.message);
            } else {
                toast.error('An error occurred while booking the table');
            }
        }
    };

    const handleClear = () => {
        setFormData({
            booking_date: '',
            booking_time: ''
        });
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    

    return (
        <Grid container  spacing={0} justifyContent="center" // centers the items horizontally
        alignItems="center"
        style={{ minHeight: '100vh' }}>
            <Grid item xs={3}>
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '300px',
                        margin: '0 auto',
                    }}
                    onSubmit={handleSubmit}
                >
                    <Typography variant="h5" align="center" gutterBottom>
                        Book service provider {username}
                    </Typography>
                    <TextField
                      
                        type="date"
                        value={formData.booking_date}
                        onChange={(e) => setFormData({ ...formData, booking_date: e.target.value })}
                        margin="normal"
                    />

                    <FormControl>
                        <InputLabel>Time Slot</InputLabel>
                        <Select
                            value={formData.booking_time}
                            onChange={(e) => setFormData({ ...formData, booking_time: e.target.value })}
                        >
                            <MenuItem value="" disabled>
                                Select a time slot
                            </MenuItem>
                            {timeSlots.map((slot, index) => (
                                <MenuItem key={index} value={slot}>
                                    {slot}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            marginTop: '20px',
                            backgroundColor: '#0f1b4c',
                            '&:hover': {
                                backgroundColor: '#0f1b2c',
                            },
                            color: 'white',
                        }}
                    >
                        Book Now
                    </Button>
                    <Button
                        type="button"
                        variant="outlined"
                        sx={{ marginTop: '20px', color: '#000000', borderColor: '#d8e0e8' }}
                        onClick={handleClear}
                    >
                        Clear
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={5}>
                <Textarea
                    FormLabel="Additional Request"
      
                     placeholder='Additional Requests here......'
                    minRows={11}
                />
            </Grid>

            {/* <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Booking Confirmation</DialogTitle>
                <DialogContent>{confirmationMessage}</DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary" variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog> */}
            <ToastContainer />
        </Grid>
    );
};

export default BookingForm;