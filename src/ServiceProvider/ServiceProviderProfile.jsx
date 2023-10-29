import React from 'react';
import { Card, CardContent, TextField, Button, Grid, Typography, LinearProgress, Avatar, List, ListItem, ListItemText } from '@mui/material';

function UserProfile() {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Typography variant="h6">Full Name</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField variant="outlined" fullWidth defaultValue="John Doe" />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Typography variant="h6">Email</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField variant="outlined" fullWidth defaultValue="john@example.com" />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Typography variant="h6">Phone</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField variant="outlined" fullWidth defaultValue="(239) 816-9029" />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Typography variant="h6">Mobile</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField variant="outlined" fullWidth defaultValue="(320) 380-4539" />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Typography variant="h6">Address</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField variant="outlined" fullWidth defaultValue="Bay Area, San Francisco, CA" />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={3}></Grid>
          <Grid item xs={9}>
            <Button variant="contained" color="primary" fullWidth>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </CardContent>

      <CardContent>
        <Typography variant="h5" component="div" className="d-flex align-items-center mb-3">
          Project Status
        </Typography>

        <Typography variant="body1">Web Design</Typography>
        <LinearProgress variant="determinate" value={80} className="mb-3" />

        <Typography variant="body1">Website Markup</Typography>
        <LinearProgress variant="determinate" value={72} className="mb-3" />

        <Typography variant="body1">One Page</Typography>
        <LinearProgress variant="determinate" value={89} className="mb-3" />

        <Typography variant="body1">Mobile Template</Typography>
        <LinearProgress variant="determinate" value={55} className="mb-3" />

        <Typography variant="body1">Backend API</Typography>
        <LinearProgress variant="determinate" value={66} />
      </CardContent>

      <CardContent>
        <div className="d-flex flex-column align-items-center text-center">
          <Avatar src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" sx={{ width: 110, height: 110, bgcolor: 'primary' }} />
          <div className="mt-3">
            <Typography variant="h4">John Doe</Typography>
            <Typography variant="subtitle2" className="text-secondary mb-1">Full Stack Developer</Typography>
            <Typography variant="subtitle2" className="text-muted font-size-sm">Bay Area, San Francisco, CA</Typography>
            <Button variant="contained" color="primary" className="mt-2">
              Follow
            </Button>
            <Button variant="outlined" color="primary" className="mt-2 ms-2">
              Message
            </Button>
          </div>
        </div>
        <hr className="my-4" />
        <List>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="h6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe me-2 icon-inline">
                    <circle cx={12} cy={12} r={10} />
                    <line x1={2} y1={12} x2={22} y2={12} />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  Website
                </Typography>
              }
              secondary="https://bootdey.com"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="h6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-github me-2 icon-inline">
                    <path d="M9 19c-5 1.5-5-2.5-7-3M14 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  Github
                </Typography>
              }
              secondary="bootdey"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="h6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter me-2 icon-inline text-info">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                  Twitter
                </Typography>
              }
              secondary="@bootdey"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="h6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram me-2 icon-inline text-danger">
                    <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  Instagram
                </Typography>
              }
              secondary="bootdey"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="h6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook me-2 icon-inline text-primary">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  Facebook
                </Typography>
              }
              secondary="bootdey"
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

export default UserProfile;
