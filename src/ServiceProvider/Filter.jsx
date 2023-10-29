import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
} from '@mui/material';

const Filter = () => {
  const buttonStyle = {
    backgroundColor: '#0f1b4c', 
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>

        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
        />

        <FormControl component="fieldset">
          <FormLabel component="legend">Category</FormLabel>
          <RadioGroup row aria-label="category" name="category">
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="All"
            />
            <FormControlLabel
              value="electronics"
              control={<Radio />}
              label="Electronics"
            />
            <FormControlLabel
              value="clothing"
              control={<Radio />}
              label="Clothing"
            />
            <FormControlLabel
              value="furniture"
              control={<Radio />}
              label="Furniture"
            />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">Sort By</FormLabel>
          <RadioGroup row aria-label="sortBy" name="sortBy">
            <FormControlLabel
              value="relevance"
              control={<Radio />}
              label="Relevance"
            />
            <FormControlLabel
              value="priceLowToHigh"
              control={<Radio />}
              label="Price (Low to High)"
            />
            <FormControlLabel
              value="priceHighToLow"
              control={<Radio />}
              label="Price (High to Low)"
            />
          </RadioGroup>
        </FormControl>

        <Button variant="contained" style={buttonStyle} fullWidth>
          Apply Filters
        </Button>
      </Paper>
    </Container>
  );
};

export default Filter;
