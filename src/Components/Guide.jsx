import { Box, styled, Typography } from "@mui/material";
import React from "react";
import fixer from "../media/repair.png";
import homeowner from "../media/house-owner.png";
import booking from "../media/appointment.png";
import { Link } from 'react-router-dom';

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CustomButton from "./CustomButton";

const Guide = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "85%",
    },
  }));

  const GuidesBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    width: "70%",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0",
      flexDirection: "column",
    },
  }));

  const GuideBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0, 2, 0),
    },
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "5%",
          height: "5px",
          backgroundColor: "#000339",
          margin: "0 auto",
        }}
      ></div>

      <Typography
        variant="h3"
        sx={{ fontSize: "35px", fontWeight: "bold", color: "#000339", my: 3 }}
      >
        How it works?
      </Typography>

      <CustomBox>
        <Typography
          variant="body2"
          sx={{
            fontSize: "16px",
            fontWeight: "500",
            color: "#5A6473",
            textAlign: "center",
          }}
        >
          A Quick Guide & Terms and Condtions to use FixItNow-All
          in one Service Provider.
        </Typography>
      </CustomBox>

      <GuidesBox>
        <GuideBox>
  <img src={fixer} alt="fixer" />
  <Typography
    variant="body2"
    sx={{
      fontWeight: "500",
      fontSize: "20px",
      color: "#3B3c45",
      my: 1,
    }}
  >
     Fixer Details & Policies
  </Typography>
  <Link to="/FixerDetails">
    <Box
      sx={{
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="body2"
        sx={{ fontWeight: "bold", fontSize: "14px", color: "#0689FF" }}
      >
        Fixer Terms
      </Typography>
      <ArrowRightAltIcon style={{ color: "#0689FF" }} />
    </Box>
  </Link>
</GuideBox>


<GuideBox>
  <img src={homeowner} alt="homeowner" />
  <Typography
    variant="body2"
    sx={{
      fontWeight: "500",
      fontSize: "20px",
      color: "#3B3c45",
      my: 1,
    }}
  >
    Homeowner Terms & Conditions
  </Typography>
  <Link to="/Terms">
    <Box
      sx={{
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="body2"
        sx={{ fontWeight: "bold", fontSize: "14px", color: "#0689FF" }}
      >
        Users Terms 
      </Typography>
      <ArrowRightAltIcon style={{ color: "#0689FF" }} />
    </Box>
  </Link>
</GuideBox>

<GuideBox>
  <img src={booking} alt="booking" />
  <Typography
    variant="body2"
    sx={{
      fontWeight: "500",
      fontSize: "20px",
      color: "#3B3c45",
      my: 1,
    }}
  >
    Appoinment Guides
  </Typography>
  <Link to="/AppGuide">
    <Box
      sx={{
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="body2"
        sx={{ fontWeight: "bold", fontSize: "14px", color: "#0689FF" }}
      >
        Appointments Guide
      </Typography>
      <ArrowRightAltIcon style={{ color: "#0689FF" }} />
    </Box>
  </Link>
</GuideBox>
      </GuidesBox>

      <Link to="/CompGuide" style={{ textDecoration: 'none' }}>
  <CustomButton
    backgroundColor="#0F1B4C"
    color="#fff"
    buttonText="See Full Guides"
    guideBtn={true}
  />
</Link>

    </Box>
    
  );
};

export default Guide;
