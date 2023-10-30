import React from "react";
import Footer from "./Footer";
import { Box, Typography, Container } from "@mui/material";

const FixerDetails = () => {
  return (
    <Box sx={{ bgcolor: "#E6F0FF", minHeight: "100vh" }}>
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h3" sx={{ fontSize: "35px", fontWeight: "bold", color: "#000339", my: 3, textAlign: 'center' }}>
        Fixer Details & Policies
      </Typography>
      <Box sx={{ typography: 'body1', mb: 4 }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          1. Introduction
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
          Welcome to FixItNow! These terms and conditions outline the rules and regulations for the use of the FixItNow platform.
        </Typography>

        <Typography variant="h6" sx={{ my: 2 }}>
          2. Fixer Registration and Verification
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
          Registration Process: To become a service provider or "fixer" on FixItNow, individuals must register by providing personal information, including identity proof, contact details, and professional qualifications.
          <Typography>
          Verification Process: The FixItNow Admin conducts a comprehensive verification process to ensure the authenticity and credibility of the fixers. The verification process includes the following steps:
          </Typography>
          <ul>
            <li>Identity Verification: FixItNow verifies the fixer's identity by cross-checking the provided identification documents with the registration details.</li>
            <li>Skill and Qualification Check: FixItNow assesses the skills and professional qualifications of the fixer to ensure they meet the platform's service quality standards.</li>
            <li>Background Check: FixItNow performs a thorough background check to verify the fixer's professional history and ensures a clean record.</li>
          </ul>
        </Typography>

        <Typography variant="h6" sx={{ my: 2 }}>
        3. Approval Process
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
         Admin Approval: The FixItNow Admin reviews the results of the verification process and approves the fixer's registration only after satisfactory verification. The Admin has the authority to accept or reject fixer registrations based on the verification outcomes.
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        Accreditation Validation: The Admin validates the authenticity and validity of the fixer's professional accreditations and certifications before approving their registration.

        </Typography>
        </Typography>
        <Typography variant="h6" sx={{ my: 2 }}>
        4. Account Activation
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        Once the Admin approves the fixer's registration, the fixer receives an account activation notification. The fixer can then access their account and provide services through the FixItNow platform.

        </Typography>
        <Typography variant="h6" sx={{ my: 2 }}>
        5. Fixer Obligations and Code of Conduct
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        Service Quality Standards: Fixers are obligated to uphold the service quality standards set by FixItNow, ensuring professionalism, expertise, and timely service delivery.
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
         Code of Conduct: Fixers are expected to adhere to a code of conduct that emphasizes ethical behavior, respect for clients, and compliance with safety protocols.
        </Typography>
        </Typography>
        <Typography variant="h6" sx={{ my: 2 }}>
        6. Termination of Account
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        Breach of Terms: FixItNow reserves the right to terminate a fixer's account in the event of any breach of the established terms and conditions or failure to comply with the platform's standards.
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        Notification: The fixer will be promptly notified of the reasons for the account termination and the subsequent actions taken by FixItNow.
        </Typography>
        </Typography>
        <Typography variant="h6" sx={{ my: 2 }}>
        7. Privacy and Data Security
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        Confidentiality: All personal and professional information provided during the registration process is subject to the privacy policy outlined by FixItNow, ensuring the confidentiality and security of all data shared.
        </Typography>
        <Typography variant="h6" sx={{ my: 2 }}>
          8. Changes to Terms
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        Modification of Terms: FixItNow retains the right to modify or revise these terms and conditions at any time. Users will be notified of any changes made to the terms through their registered email addresses.
        </Typography>
        <Typography variant="h6" sx={{ my: 2 }}>
          9. Contact Information
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
          For any inquiries or concerns regarding the terms and conditions, please contact the FixItNow support team at Fixitnow@gmail.com.
        </Typography>
      </Box>
      <Footer/>
    </Container>
    </Box>
  );
};

export default FixerDetails;
