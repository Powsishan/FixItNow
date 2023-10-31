import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Grid, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function EditForm({ data, onSave, onCancel }) {
  const [editedData, setEditedData] = useState(data);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSave = () => {
    onSave(editedData);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" gutterBottom>Edit Details</Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={editedData.firstName}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={editedData.lastName}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Mobile Number"
                name="mobileNumber"
                value={editedData.mobileNumber}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                name="email"
                value={editedData.email}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="NIC"
                name="NICnumber"
                value={editedData.NICnumber}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Address"
                name="address"
                value={editedData.address}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Job Title"
                name="JobTitle"
                value={editedData.JobTitle}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="Description"
                value={editedData.Description}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            style={{ marginTop: '20px' }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<CancelIcon />}
            onClick={onCancel}
            style={{ marginTop: '20px', marginLeft: '10px' }}
          >
            Cancel
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default EditForm;
