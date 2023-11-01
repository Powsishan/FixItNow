import React, { useState } from 'react';
import { Button, Container, CssBaseline, TextField, Typography, Paper, Avatar, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = '/Home';
        } else if (response.status === 401) {
          setError('Invalid username or password');
        } else {
          setError('An error occurred');
        }
      })
      .catch((error) => {
        setError('An error occurred');
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Paper elevation={3} style={{ padding: '20px', width: '100%' }}>
          <Avatar style={{ margin: 'auto', backgroundColor: 'secondary' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography  align= "center" marginTop="10px" component="h1" variant="h5">
            Admin Login
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '20px 0' }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminLogin;
