import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './user.css'; // Import your custom CSS
import { Nav, Tab } from 'react-bootstrap';
import image1 from '../media/image1.jpeg';
import logo from '../media/logo(1).png';
import { styled } from "@mui/material";
import Axios from 'axios';

const UserDashboard = () => {
  const [serviceProviderData, setServiceProviderData] = useState({});
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [JobTitle, setJobTitle] = useState('');
  const [mobileNumber, setmobileNumber] = useState('');
  const [email, setemail] = useState('');
  const [NICnumber, setNICnumber] = useState('');
  const [address, setaddress] = useState('');
  const [qualification, setqualification] = useState('');
  const [Description, setDescription] = useState('');


  useEffect(() => {

    const apiUrl = 'http://localhost:3001/profile-data'; 

    Axios.get(apiUrl,{ withCredentials: true })
      .then((response) => {
        
        setUsername(response.data.username);
        setServiceProviderData(response.data);
        setFirstName(response.data.firstName); 
        
        setJobTitle(response.data.JobTitle);
        setmobileNumber(response.data.mobileNumber);
        setemail(response.data.email);
        setNICnumber(response.data.NICnumber);
        setaddress(response.data.address);
        setqualification(response.data.qualification);
        setDescription(response.data.Description);
      })
      .catch((error) => {
        console.error('Error fetching service provider data:', error);
        
      });
  }, []);



  const [activeTab, setActiveTab] = useState('profile');
  const [isEditMode, setIsEditMode] = useState(false);




  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value); 
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleJobTitleChange = (event) => {
    setJobTitle(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setmobileNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setemail(event.target.value);
  };

  const handleNicChange = (event) => {
    setNICnumber(event.target.value);
  };

  const handleAddressChange = (event) => {
    setaddress(event.target.value);
  };

  const handleQualificationChange = (event) => {
    setqualification(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  const handleLogout = () => {
    // Add your logout logic here
    // This could include clearing user session data, making an API request, or other relevant actions.
  };

  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  const handleEditClick = () => {

    setIsEditMode(!isEditMode);
  };


  const handleUpdateClick = () => {
    console.log('isEditMode:', isEditMode);
    setIsEditMode(false);
  };

  const handleResetClick = () => {
    setFirstName(serviceProviderData.firstName);
    setLastName(serviceProviderData.lastName);
    setUsername(serviceProviderData.username);
    setJobTitle(serviceProviderData.JobTitle);
    setmobileNumber(serviceProviderData.mobileNumber);
    setemail(serviceProviderData.email);
    setNICnumber(serviceProviderData.NICnumber);
    setaddress(serviceProviderData.address);
    setqualification(serviceProviderData.qualification);
    setDescription(serviceProviderData.description);

    setIsEditMode(false);
  };







  const NavbarLogo = styled("img")(({ theme }) => ({
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  return (

    <div className=" card-body" style={{ backgroundColor: '#e6f0ff' }}>
      <div className="top-navbar">
        <div className="logo-container">
          <NavbarLogo src={logo} alt="logo" />
        </div>
        <div className="logout-container">
          <button className="btn btn-danger logout-button">Logout</button>
        </div>
      </div>
      <div className="card rounded-4 p-4">
        <div className="container">
          <div className="row gutters-sm">
            <div className="col-md-4 d-none d-md-block">
              <div className="card">
                <div className="card-body ">
                  <div class="profile-sidebar">
                    <div class="profile-userpic">
                      <img src={image1} class="img-responsive" alt="" />
                    </div>
                    <div class="profile-usertitle">
                      <div class="profile-usertitle-name">
                        <h2>{`${serviceProviderData.firstName} ${serviceProviderData.lastName}`}</h2>
                      </div>
                      <div class="profile-usertitle-job">
                        <p>{serviceProviderData.JobTitle}</p>
                      </div>
                    </div>

                    <div class="profile-userbuttons">
                      {isEditMode ? (
                        // Render the "Update" and "Reset" buttons in edit mode
                        <button type="button" className="btn btn-primary" onClick={handleUpdateClick}>
                          Update Profile
                        </button>
                      ) : (
                        // Render the "Edit" button when not in edit mode
                        <button type="button" className="btn btn-outline-primary" onClick={handleEditClick}>
                          Edit
                        </button>
                      )}
                      {isEditMode && (
                        // Render the "Reset" button in edit mode
                        <button type="button" className="btn btn-light" onClick={handleResetClick}>
                          Reset Changes
                        </button>
                      )}
                    </div>

                  </div>
                  <Nav variant="tabs" defaultActiveKey="#profile" class="nav flex-column nav-pills nav-gap-y-1">
                    <a
                      href="#profile"
                      data-toggle="tab"
                      className={`nav-item nav-link has-icon nav-link-faded ${activeTab === 'profile' ? 'active' : ''}`}
                      onClick={() => handleSelect('profile')}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-user mr-2"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      Profile Information
                    </a>
                    <a
                      href="#account"
                      data-toggle="tab"
                      className={`nav-item nav-link has-icon nav-link-faded ${activeTab === 'account' ? 'active' : ''}`}
                      onClick={() => handleSelect('account')}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-settings mr-2"
                      >
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                      </svg>
                      Submit Documents
                    </a>
                    <a
                      href="#security"
                      data-toggle="tab"
                      className={`nav-item nav-link has-icon nav-link-faded ${activeTab === 'security' ? 'active' : ''}`}
                      onClick={() => handleSelect('security')}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-shield mr-2"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>

                      </svg>
                      Security Settings
                    </a>
                    <a
                      href="#notification"
                      data-toggle="tab"
                      className={`nav-item nav-link has-icon nav-link-faded ${activeTab === 'notification' ? 'active' : ''}`}
                      onClick={() => handleSelect('notification')}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-bell mr-2"
                      >
                        <path d="M18 8a6 6 0 0 0-12 0"></path>
                        <path d="M3 13v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1"></path>
                      </svg>
                      Appointments
                    </a>

                  </Nav>
                </div>
              </div >
            </div >


            <div class="col-md-8">
              <div class="card">
                <div class="card-body ">
                  {/* This is the mobile responsive navigation */}
                  <div className="card-header border-bottom mb-3 d-flex d-md-none">
                    <Tab.Container id="mobileTabs" activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
                      <Nav variant="pills" role="tablist">
                        <Nav.Item>
                          <Nav.Link eventKey="profile">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-user"
                            >
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="account">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-shield"
                            >
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="security">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-settings"
                            >
                              <circle cx="12" cy="12" r="3"></circle>
                              <path
                                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l.06.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09A1.65 1.65 0 0 0 9 4.6 1.65 1.65 0 0 0-1.51-1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
                              </path>
                            </svg>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="notification">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-bell"
                            >
                              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                            </svg>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="logout" onClick={handleLogout}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-log-out"
                            >
                              <path d="M9 9l3-3 3 3m0 6H8a4 4 0 01-4-4V5a4 4 0 014-4h10a4 4 0 014 4v6a4 4 0 01-4 4H9z"></path>
                            </svg>
                            Logout
                          </Nav.Link>
                        </Nav.Item>

                      </Nav>
                    </Tab.Container>
                  </div>

                  {activeTab === 'profile' && (
                    <div className="tab-pane active" id="profile">
                      <div className="tab-pane active" id="profile">

                        <h6>YOUR PROFILE INFORMATION</h6>
                        <hr />
                        <form className="row g-3">
                          <div className="form-group col-md-6">
                            <label htmlFor="fullName">First Name</label>
                            {isEditMode ? (
                              <input
                                type="text"
                                className="form-control"
                                id="fullName"
                                aria-describedby="fullNameHelp"
                                placeholder="Enter your fullname"
                                value={firstName}
                                onChange={handleFirstNameChange}


                              />
                            ) : (
                              <div>{firstName}</div>
                            )}
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="fullName">Last Name</label>
                            {isEditMode ? (
                              <input
                                type="text"
                                className="form-control"
                                id="fullName"
                                aria-describedby="fullNameHelp"
                                placeholder="Enter your fullname"
                                readOnly={!isEditMode}
                                value={lastName}
                                onChange={handleLastNameChange}
                              />
                            ) : (
                              <div>{lastName}</div>
                            )}

                          </div>

                          <div className="form-group col-md-6">
                            <label htmlFor="username">Username</label>
                            {isEditMode ? (
                              <input
                                type="text"
                                className="form-control"
                                id="username"
                                aria-describedby="usernameHelp"
                                placeholder="Enter your username"
                                readOnly={!isEditMode}
                                value={username}
                                onChange={handleUsernameChange}
                              />
                            ) : (
                              <div>{username}</div>
                            )}

                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="location">Job Title</label>
                            {isEditMode ? (
                              <input
                                type="text"
                                className="form-control"
                                id="location"
                                placeholder="Enter your location"
                                readOnly={!isEditMode}
                                value={JobTitle}
                                onChange={handleJobTitleChange}
                              />
                            ) : (
                              <div>{JobTitle}</div>
                            )}

                          </div>
                          <div className="form-group col-md-4">
                            <label className="form-label">Phone</label>
                            {isEditMode ? (
                              <input
                                type="text"
                                className="form-control"
                                readOnly={!isEditMode}
                                value={mobileNumber}
                                onChange={handlePhoneChange}
                              />
                            ) : (
                              <div>{mobileNumber}</div>
                            )}

                          </div>
                          <div className="form-group col-md-4">
                            <label className="form-label">E-mail</label>
                            {isEditMode ? (
                              <input
                                type="text"
                                className="form-control mb-1"
                                readOnly={!isEditMode}
                                value={email}
                                onChange={handleEmailChange}
                              />
                            ) : (
                              <div>{email}</div>
                            )}

                          </div>
                          <div className="form-group col-md-4">
                            <label className="form-label">NIC</label>
                            {isEditMode ? (
                              <input
                                type="text"
                                className="form-control"
                                readOnly={!isEditMode}
                                value={NICnumber}
                                onChange={handleNicChange}
                              />
                            ) : (
                              <div>{NICnumber}</div>
                            )}

                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="location">Address</label>
                            {isEditMode ? (
                              <input
                                type="text"
                                className="form-control"
                                id="location"
                                placeholder="Enter your location"
                                readOnly={!isEditMode}
                                value={address}
                                onChange={handleAddressChange}
                              />
                            ) : (
                              <div>{address}</div>
                            )}

                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="bio">Qualification</label>
                            {isEditMode ? (
                              <textarea
                                className="form-control autosize"
                                id="bio"
                                placeholder="Write something about you"
                                readOnly={!isEditMode}
                                style={{ overflow: 'hidden', overflowWrap: 'break-word', resize: 'none', height: '62px' }}
                                value={qualification}
                                onChange={handleQualificationChange}
                              />
                            ) : (
                              <div>{qualification}</div>
                            )}

                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="bio">Description</label>
                            {isEditMode ? (
                              <textarea
                                className="form-control autosize"
                                id="bio"
                                placeholder="Write something about you"
                                readOnly={!isEditMode}
                                style={{ overflow: 'hidden', overflowWrap: 'break-word', resize: 'none', height: '62px' }}
                                value={Description}
                                onChange={handleDescriptionChange}
                              />
                            ) : (
                              <div>{Description}</div>
                            )}

                          </div>
                          {/* <div className="form-group small text-muted col-md-12">
                            All of the fields on this page are optional and can be deleted at any time, and by filling them out, you're giving us consent to share this data wherever your user profile appears.
                          </div> */}
                          {/* <div className="col-md-12">
                            <button type="button" className="btn btn-primary">Update Profile</button>
                            <button type="reset" className="btn btn-light">Reset Changes</button>
                          </div> */}
                        </form>
                      </div>
                    </div>
                  )}
                  {activeTab === 'account' && (
                    <div className="tab-pane" id="account">
                      <div className="tab-pane" id="account">
                        <h6>DOCUMENT SUBMISSION</h6>
                        <hr />
                        <form>
                          <div>
                            <label htmlFor="formFile" className="form-label">Default file input example</label>
                            <input className="form-control" type="file" id="formFile" />
                          </div>
                          <div>
                            <label htmlFor="formFile" className="form-label">Default file input example</label>
                            <input className="form-control" type="file" id="formFile" />
                          </div>
                          <div>
                            <label htmlFor="formFile" className="form-label">Default file input example</label>
                            <input className="form-control" type="file" id="formFile" />
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                  {activeTab === 'security' && (
                    <div className="tab-pane" id="security">
                      <div className="tab-pane" id="security">
                        <h6>SECURITY SETTINGS</h6>
                        <hr />
                        <form>
                          <div className="form-group">
                            <label className="d-block">Change Password</label>
                            <input type="text" className="form-control" placeholder="Enter your old password" />
                            <input type="text" className="form-control mt-1" placeholder="New password" />
                            <input type="text" className="form-control mt-1" placeholder="Confirm new password" />
                          </div>
                        </form>
                        <hr />
                        <form>
                          <div className="form-group">
                            <label className="d-block text-danger">Delete Account</label>
                            <p className="text-muted font-size-sm">Once you delete your account, there is no going back. Please be certain.</p>
                          </div>
                          <button className="btn btn-danger" type="button">Delete Account</button>
                        </form>
                      </div>
                    </div>
                  )}
                  {activeTab === 'notification' && (
                    <div className="tab-pane" id="notification">
                      <div className="tab-pane" id="notification">
                        <h6>NOTIFICATION SETTINGS</h6>
                        <hr />
                        <form>
                          <div className="form-group">
                            <label className="d-block mb-0">Security Alerts</label>
                            <div className="small text-muted mb-3">Receive security alert notifications via email</div>
                            <div className="custom-control custom-checkbox">
                              <input type="checkbox" className="custom-control-input" id="customCheck1" checked />
                              <label className="custom-control-label" htmlFor="customCheck1">Email each time a vulnerability is found</label>
                            </div>
                            <div className="custom-control custom-checkbox">
                              <input type="checkbox" className="custom-control-input" id="customCheck2" checked />
                              <label className="custom-control-label" htmlFor="customCheck2">Email a digest summary of vulnerability</label>
                            </div>
                          </div>
                          <div className="form-group mb-0">
                            <label className="d-block">SMS Notifications</label>
                            <ul className="list-group list-group-sm">
                              <li className="list-group-item has-icon">
                                Comments
                                <div className="custom-control custom-control-nolabel custom-switch ml-auto">
                                  <input type="checkbox" className="custom-control-input" id="customSwitch1" checked />
                                  <label className="custom-control-label" htmlFor="customSwitch1"></label>
                                </div>
                              </li>
                              <li className="list-group-item has-icon">
                                Updates From People
                                <div className="custom-control custom-control-nolabel custom-switch ml-auto">
                                  <input type="checkbox" className="custom-control-input" id="customSwitch2" />
                                  <label className="custom-control-label" htmlFor="customSwitch2"></label>
                                </div>
                              </li>
                              <li className="list-group-item has-icon">
                                Reminders
                                <div className="custom-control custom-control-nolabel custom-switch ml-auto">
                                  <input type="checkbox" className="custom-control-input" id="customSwitch3" checked />
                                  <label className="custom-control-label" htmlFor="customSwitch3"></label>
                                </div>
                              </li>
                              <li className="list-group-item has-icon">
                                Events
                                <div className="custom-control custom-control-nolabel custom-switch ml-auto">
                                  <input type="checkbox" className="custom-control-input" id="customSwitch4" checked />
                                  <label className="custom-control-label" htmlFor="customSwitch4"></label>
                                </div>
                              </li>
                              <li className="list-group-item has-icon">
                                Pages You Follow
                                <div className="custom-control custom-control-nolabel custom-switch ml-auto">
                                  <input type="checkbox" className="custom-control-input" id="customSwitch5" />
                                  <label className="custom-control-label" htmlFor="customSwitch5"></label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div >
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;