import React, { useState } from 'react';
import ServiceProvidersTable from './ServiceProvidersTable';
import HomeOwnersTable from './HomeOwnersTable';
import Requests from './Requests';
import { useNavigate } from 'react-router-dom';
import ReportsTable from './ReportsTable';
import './App.css';

function Home() {
  const [showServiceProvidersTable, setShowServiceProvidersTable] = useState(false);
  const [showHomeOwnersTable, setShowHomeOwnersTable] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [showReportsTable, setShowReportsTable] = useState(false);

  const serviceProviders = [
    {
      id: 1,
      name: 'John Doe',
      nic: '123456789',
      mobileNumber: '555-555-5555',
      rating: 4.5,
    },
    // Add more service provider objects here
  ];

  const homeOwners = [
    {
      id: 1,
      name: 'John Doe',
      nic: '123456789',
      email: 'kethan',
      mobileNumber: '555-555-5555',
    },
    // Add more objects here
  ];

  const requests = [
    {
      id: 1,
      name: 'John Doe',
      nic: '123456789',
      email: 'kethan',
      mobileNumber: '555-555-5555',
    },
    // Add more objects here
  ];

  const reports = [
    {
      id: 1,
      name: 'John Doe',
      nic: '123456789',
      mobileNumber: '555-555-5555',
      rating: 4.5,
    },
    // Add more service provider objects here
  ];

  const toggleServiceProviders = () => {
    setShowServiceProvidersTable(!showServiceProvidersTable);
  };

  const toggleHomeOwners = () => {
    setShowHomeOwnersTable(!showHomeOwnersTable);
  };

  const toggleRequests = () => {
    setShowRequests(!showRequests);
  };

  const toggleReports = () => {
    setShowReportsTable(!showReportsTable);
  };

  return (
    
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card' onClick={toggleServiceProviders}>
          <div className='card-inner'>
            <h3>SERVICE PROVIDERS</h3>
          
          </div>
          <h1>00</h1>
        </div>

        <div className='card' onClick={toggleHomeOwners}>
          <div className='card-inner'>
            <h3>HOME OWNERS</h3>
           
          </div>
          <h1>00</h1>
        </div>

        <div className='card' onClick={toggleRequests}>
          <div className='card-inner'>
            <h3>REQUESTS</h3>
           
          </div>
          <h1>00</h1>
        </div>

        <div className='card' onClick={toggleReports}>
          <div className='card-inner'>
            <h3>Appointments</h3>
            
          </div>
          <h1>00</h1>
        </div>
      </div>
      {showServiceProvidersTable && <ServiceProvidersTable serviceProviders={serviceProviders} />}
      {showHomeOwnersTable && <HomeOwnersTable homeOwners={homeOwners} />}
      {showRequests && <Requests requests={requests} />}
      {showReportsTable && <ReportsTable reports={reports} />}
    </main>
  );
}

export default Home;
