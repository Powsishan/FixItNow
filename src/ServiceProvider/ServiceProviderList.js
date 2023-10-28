import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import CustomCard from './CustomCard'; 

const ServiceProviderList = ({ setSelectedTable }) => {
  const [tables, setTables] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await axios.get('http://localhost:3001/serviceproviderprofile');
        setTables(res.data);
      } catch (err) {
        console.error('An error occurred while fetching data: ', err);
      }
    };

    fetchTables();
  }, []);

  const handleTableSelect = (tableId) => {
    setSelectedTable(tableId);
    navigate(`/booking/${tableId}`);
  };

  return (
    <section className="vh-100" style={{ backgroundColor: '#E6F0FF' }}>
      <Container className="mt-5 d-flex justify-content-center">
        <Row>
          {tables.map((table, index) => (
            <Col key={index} md={6} className='customCol'>
              <CustomCard table={table} handleTableSelect={handleTableSelect} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ServiceProviderList;






