import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Components/Navbar";
import Box from "@mui/material/Box";

import Filter from './Filter'; 
import CustomCard from './CustomCard'; 

const ServiceProviderList = () => {

  const [tables, setTables] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('u_username');
    console.log('login user:', storedUsername);
    if (storedUsername) {
    const fetchTables = async () => {
      try {
        setLoading(true);
        const apiUrl = `http://localhost:3001/serviceproviderprofile?username=${storedUsername}`;

        const res = await axios.get(apiUrl);

        setTables(res.data);
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    

    fetchTables();
  }else{

  };
  }, []);

  const handleTableSelect = (username,u_username) => {
    navigate(`/booking/${username}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Box sx={{ backgroundColor: "#E6F0FF", minHeight: "80vh" }}>
      <Navbar />

      <Row>
        <Col md={4}>
          <Filter />
        </Col>
        <Col md={8}>
          <section className="vh-100" style={{ backgroundColor: '#E6F0FF' }}>
            <Container className=" d-flex justify-content-center">
              <Row >
                {tables.map((table, index) => (
                  <Col key={index} md={12} className='customCol'>
                    <CustomCard table={table} handleTableSelect={handleTableSelect} />
                  </Col>
                ))}
              </Row>
            </Container>
          </section>
        </Col>
      </Row>
    </Box>
  );
};

export default ServiceProviderList;
