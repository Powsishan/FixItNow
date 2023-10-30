import { Box, Container, styled, Typography } from "@mui/material";
import React from "react";
import Service from "./Service";
import { services } from "../services";

const Services = () => {
  const ServicesBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "area-between",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const ServicesTextBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  }));

  return (
    <Box sx={{ mt: 5, backgroundColor: "#F5FAFE", py: 10 }}>
      <Container>
        <ServicesTextBox>
          <Typography
            sx={{ color: "#000339", fontSize: "35px", fontWeight: "bold" }}
          >
            Services
          </Typography>
          <Typography sx={{ color: "#5A6473", fontSize: "16px", mt: 1 }}>
            Convinience at you door step!
          </Typography>
        </ServicesTextBox>

        <ServicesBox >
          {services.map((service) => (
            <Service
              key={service.id}
              img={service.img}
              price={service.price}
              type={service.type}
              completed={service.completed}
              incoming={service.incoming}
              area={service.area}
              
            />
          ))}
        </ServicesBox>
      </Container>
    </Box>
  );
};

export default Services;
