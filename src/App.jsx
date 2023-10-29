import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Companies from './Components/Companies';
import Guide from './Components/Guide';
import Hero from './Components/Hero';
import Properties from './Components/Properties';
import Details from './Components/Details';
import GetStarted from './Components/GetStarted';
import Footer from './Components/Footer';
import Res from './Login/Res'; 
import User from './Dashboard/User'; 
import UserDashboard from './User/UserDashboard'; 
import Custom from './ServiceProvider/CustomCard'; 
import ServiceProfile from './ServiceProvider/ServiceProviderProfile'; 



import ServiceProviderList from './ServiceProvider/ServiceProviderList'; 




function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/become-a-fixer" element={<Res />} />
        <Route path="/user" element={<User />} />
        <Route path="/custom" element={<Custom />} />
        <Route path="/ServiceProviderProfile" element={<ServiceProfile />} />
        <Route path="/ServiceProviderList" element={<ServiceProviderList />} />
        <Route path="/Userdashboard" element={<UserDashboard />} />

        <Route path="/" element={
          <>
            {/* Your existing routes */}
            <Hero />
            <Companies />
            <Guide />
            <Properties />
            <Details />
            <GetStarted />
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
