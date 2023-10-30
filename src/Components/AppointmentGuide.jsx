import React from "react";
import Footer from "./Footer";
import { Box, Typography, Container } from "@mui/material";

const AppointmentGuide = () => {
  return (
    <Box sx={{ bgcolor: "#E6F0FF", minHeight: "100vh" }}>
    <Container maxWidth="md" sx={{ my: 4 }}>

      <Typography variant="h3" sx={{ fontSize: "35px", fontWeight: "bold", color: "#000339", my: 3, textAlign: 'center' }}>
        Appointment Guide
      </Typography>

      <Box sx={{ typography: 'body1', mb: 4 }}>
        <Typography variant="h6" sx={{ my: 2 }}>
        Step 1: Visit the FixItNow Website
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        Open your preferred web browser and navigate to the FixItNow website (www.fixitnow.com).
        </Typography>

        <Typography variant="h6" sx={{ my: 2 }}>
        Step 2: Sign In/Register
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        If you are a returning user, sign in using your registered email address and password. If you are a new user, click on the "Sign Up" button to create an account by providing the required details.
        </Typography>

        <Typography variant="h6" sx={{ my: 2 }}>
        Step 3: Browse Services
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        Once you've signed in, you will be directed to the homepage. Browse through the various service categories provided on the website to identify the specific service you require for your home.
        </Typography>

        <Typography variant="h6" sx={{ my: 2 }}>
        Step 4: Select Service
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        Click on the relevant service category or use the search bar to find the specific service you need, such as "Plumbing," "Electrical Repair," "House Cleaning," etc.
        </Typography>

        <Typography variant="h6" sx={{ my: 2 }}>
        Step 5: Choose Service Provider
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        View the list of available service providers for your selected service. Review their profiles, including ratings, reviews, and service rates, to make an informed decision.
        </Typography>

        <Typography variant="h6" sx={{ my: 2 }}>
        Step 6: Schedule Appointment
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        After selecting your preferred service provider, click on the "Schedule Appointment" or "Book Now" button. Choose a convenient date and time for the service to be performed.
        </Typography>

        <Typography variant="h6" sx={{ my: 2 }}>
        Step 7: Provide Details
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        Fill in the necessary details, including your address, specific service requirements, and any other relevant information that the service provider might need to know.
        </Typography>
        
        <Typography variant="h6" sx={{ my: 2 }}>
        Step 8: Review and Confirm
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        Carefully review the details of your appointment before confirming the booking. Ensure that the date, time, and service details are accurate.
        </Typography>
        <Typography variant="h6" sx={{ my: 2 }}>
          Step 9: Make Payment
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
          Depending on the website's payment policy, you might be required to make an upfront payment or pay after the service has been completed. Follow the payment instructions provided on the website.
        </Typography>
        <Typography variant="h6" sx={{ my: 2 }}>
        Step 10: Appointment Confirmation
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        Once the payment is processed, you will receive a confirmation of your appointment via email or a notification on the website. Make sure to keep the appointment details handy for future reference.


        </Typography>
        <Typography variant="h6" sx={{ my: 2 }}>
        Step 11: Post-Service Feedback
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        After the service has been completed, you may be requested to provide feedback on the service provider's performance. Your feedback will contribute to the service provider's ratings and help other users make informed decisions.
        </Typography>
      </Box>
      <Footer/>
    </Container>
    </Box>
  );
};

export default AppointmentGuide;
