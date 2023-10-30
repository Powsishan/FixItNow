import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Companies from './Components/Companies';
import Guide from './Components/Guide';
import Hero from './Components/Hero';
import Properties from './Components/Services';
import Details from './Components/Details';
import GetStarted from './Components/GetStarted';
import Footer from './Components/Footer';
import Res from './Login/Res'; 
import UsrLogin from './Login/UsrLogin';

import User from './Dashboard/User'; 
import UserDashboard from './User/UserDashboard'; 
import FixerDetails from './Components/FixerDetails';
import TermsCondition from './Components/TermsCondition';
import AppointmentGuide from './Components/AppointmentGuide';
import CompleteGuide from './Components/CompleteGuide';
import ServiceProviderList from './ServiceProvider/ServiceProviderList'; 




function App() {
  return (
    <Router>
      
      <Routes>
      <Route path="/FixerDetails" element={<FixerDetails />} />
      <Route path="/Terms" element={<TermsCondition />} />
      <Route path="/AppGuide" element={<AppointmentGuide />} />
      <Route path="/CompGuide" element={<CompleteGuide />} />

        <Route path="/become-a-fixer" element={<Res />} />
        <Route path="/Usrlogin" element={<UsrLogin />} />
        <Route path="/user" element={<User />} />
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
