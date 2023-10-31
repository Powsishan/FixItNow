import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../ServiceProvider/user.css';
import { useNavigate } from 'react-router-dom';
import { Nav, Tab } from 'react-bootstrap';
import logo from '../media/logo(1).png';
import { styled } from "@mui/material";
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import EditIcon from '@mui/icons-material/ModeEdit';
import UpdateIcon from '@mui/icons-material/Done';
import RestoreIcon from '@mui/icons-material/RotateLeftOutlined';
import Logout from '@mui/icons-material/LogoutOutlined';
import Avatar from '@mui/material/Avatar';
 import BookedService from './BookedService';




const UserDashboard = () => {
  const [serviceProviderData, setServiceProviderData] = useState({});
  const [firstName, setFirstName] = useState('');
  const [img, setImage] = useState('');
  const [lastName, setLastName] = useState('');
  const [u_username, setUsername] = useState('');
 
  const [mobileNumber, setmobileNumber] = useState('');
  const [email, setemail] = useState('');
  const [NICnumber, setNICnumber] = useState('');
  const [address, setaddress] = useState('');
 
 
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditMode, setIsEditMode] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('u_username');
    console.log('userdashboard user:', storedUsername);
    if (storedUsername) {
      // Use the stored username to fetch user data
      const apiUrl = `http://localhost:3001/user-profile-data?u_username=${storedUsername}`;

      Axios.get(apiUrl, { withCredentials: true })
        .then((response) => {
          console.log('Username:', response.data.u_username);
          setUsername(response.data.u_username);
          setServiceProviderData(response.data);
          setFirstName(response.data.firstName);
          setImage(response.data.img);
          setLastName(response.data.lastName);
         
          setmobileNumber(response.data.mobileNumber);
          setemail(response.data.email);
          setNICnumber(response.data.NICnumber);
          setaddress(response.data.address);
         
        })
        .catch((error) => {
          console.error('Error fetching service provider data:', error);

        });
    } else {
      //  username is not found in local storage
      //  redirect to the login page
    }
  }, []);


  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
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

  

  
  const handleLogout = () => {
    Navigate('/Usrlogin')
    localStorage.clear();
  };

  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };


  const handleUpdateClick = () => {

    const updatedUserData = {
      firstName,
      lastName,
      img,
      u_username,
     
      mobileNumber,
      email,
      NICnumber,
      address,
     
    };

    // Make a PUT request to update the user data
    const apiUrl = `http://localhost:3001/user-update-profile`; // Replace with your API endpoint
    Axios.put(apiUrl, updatedUserData, { withCredentials: true })
      .then((response) => {
        console.log('User data updated successfully:', response.data);

        // You can also update the local state to reflect the changes
        setServiceProviderData(updatedUserData);
        toast.success('User data updated successfully');


        // Exit edit mode
        setIsEditMode(false);
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      });
  };



  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleChangePassword = () => {
    // Implement the logic for changing the password here.
    // Send a request to your backend API to change the password.
    if (newPassword !== confirmNewPassword) {
      toast.error('New passwords do not match');
      return;
    }

    // Make an API request to change the password
    const changePasswordData = {
      u_username,
      oldPassword,
      newPassword,
    };

    Axios.post('http://localhost:3001/user-change-password', changePasswordData, { withCredentials: true })
      .then((response) => {
        // Handle success, e.g., show a success message and clear the password fields.
        toast.success('Password changed successfully');
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message.
        console.error('Error changing password:', error);
        toast.error('Error changing password');
      });
  };


  const handleResetClick = () => {
    setFirstName(serviceProviderData.firstName);
    setLastName(serviceProviderData.lastName);
    setImage(serviceProviderData.img);
    setUsername(serviceProviderData.u_username);
  
    setmobileNumber(serviceProviderData.mobileNumber);
    setemail(serviceProviderData.email);
    setNICnumber(serviceProviderData.NICnumber);
    setaddress(serviceProviderData.address);
   
    setIsEditMode(false);
  };


  const handleDeleteAccount = () => {
    // Ask the user to confirm the account deletion
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // If the user confirms, make a request to the API to delete the account
      Axios.delete('http://localhost:3001/delete-account', { data: { u_username } })
        .then((response) => {
          // Handle success, e.g., show a success message and log the user out
          toast.success('Account deleted successfully');
          localStorage.clear(); // Log the user out by clearing local storage
          Navigate('/become-a-fixer'); // Redirect the user to the login or home page
        })
        .catch((error) => {
          // Handle errors, e.g., show an error message.
          console.error('Error deleting account:', error);
          toast.error('Error deleting account');
        });
    }
  };



  const calculateProfileCompleteness = () => {
    const fields = [
      firstName, lastName, u_username, mobileNumber, img,
      email, NICnumber, address, 
    ];
    const totalFields = fields.length;
    const filledFields = fields.filter(field => field !== null && field !== '').length;
    return Math.round((filledFields / totalFields) * 100);
  };


  // Render the progress bar in a similar style to your example
  const renderProgressBar = () => {
    const completeness = calculateProfileCompleteness();
    return (
      <div className="progress-bar-container" >
        <Typography
          level="body-xs"
          fontWeight="xl"
          textColor=""
          sx={{ mixBlendMode: 'difference' }}
        >
          PROFILE COMPLETED {`${completeness}%`}
        </Typography>
        <LinearProgress
          determinate
          variant="outlined"
          color="primary"
          size="sm"
          thickness={24}
          value={completeness}
          sx={{
            '--LinearProgress-radius': '20px',
            '--LinearProgress-thickness': '22px',

          }}
        />
      </div>
    );
  };


  const NavbarLogo = styled("img")(({ theme }) => ({
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));





  return (

    <div className=" card-body" style={{ backgroundColor: '#e6f0ff' }}>
      <ToastContainer />
      <div className="top-navbar">
        <div className="logo-container">
          <NavbarLogo src={logo} alt="logo" />
        </div>
      </div>
      <div className="card rounded-4 p-4">
        <div className="container">
          <div className="row gutters-sm">
            <div className="col-md-4 d-none d-md-block">
              <div className="card">
                <div className="card-body ">
                  <div class="profile-sidebar">
                    <div className="profile-userpic">
                      <Avatar
                        alt="Remy Sharp"
                        src={logo}
                        sx={{ width: 150, height: 150,marginLeft:11, borderBlockColor:'#e6f0ff',border:2  }}
                      />
                    </div>
                    <div class="profile-usertitle">
                      <div class="profile-usertitle-name">
                        <h2>{`${serviceProviderData.firstName} ${serviceProviderData.lastName}`}</h2>
                      </div>
                     
                      {renderProgressBar()}
                    </div>

                    <div class="profile-userbuttons">
                      {isEditMode ? (

                        <>
                          <button type="button" className="btn btn-primary" onClick={handleUpdateClick}>
                            Update Profile
                          </button>
                          <button type="button" className="btn btn-light" onClick={handleResetClick}>
                            Reset Changes
                          </button>

                        </>
                      ) : (

                        <>
                          <button type="button" className="btn btn-outline-primary" onClick={handleEditClick}>
                            Edit
                          </button>
                          <button type="button" className="btn btn-outline-danger" onClick={handleLogout}>
                            Logout
                          </button>
                        </>
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
                            <Logout />

                          </Nav.Link>
                        </Nav.Item>

                      </Nav>
                    </Tab.Container>

                  </div>
                  <div className="card-header border-bottom mb-3 d-flex d-md-none">
                    {renderProgressBar()}
                    {isEditMode ? ( // Hide "Edit" button when editMode is true
                      <>
                        <Nav.Item>
                          <Nav.Link eventKey="update" className=" ms-3 me-3" onClick={handleUpdateClick}>
                            <UpdateIcon />
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="reset" className="me-3" onClick={handleResetClick}>
                            <RestoreIcon />
                          </Nav.Link>
                        </Nav.Item>
                      </>
                    ) : (
                      <Nav.Item className="ms-3 me-3"> {/* Add margin between the items */}
                        <Nav.Link eventKey="edit" onClick={handleEditClick}>
                          <EditIcon />
                        </Nav.Link>
                      </Nav.Item>
                    )}
                  </div>

                  {/* This is the mobile responsive navigation end here*/}
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
                            <label htmlFor="u_username">Username</label>
                            {isEditMode ? (
                              <input
                                type="text"
                                className="form-control"
                                id="username"
                                aria-describedby="usernameHelp"
                                placeholder="Enter your username"
                                readOnly={!isEditMode}
                                value={u_username}
                                onChange={handleUsernameChange}
                              />
                            ) : (
                              <div>{u_username}</div>
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
                      <h6>SECURITY SETTINGS</h6>
                      <hr />
                      <form>
                        <div className="form-group">
                          <label className="d-block">Change Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your old password"
                            value={oldPassword}
                            onChange={handleOldPasswordChange}
                          />
                          <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="New password"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                          />
                          <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Confirm new password"
                            value={confirmNewPassword}
                            onChange={handleConfirmNewPasswordChange}
                          />
                          <div className='profile-userbuttons'>
                            <button className="btn btn-primary w-auto " type="button" onClick={handleChangePassword}>
                              Change Password
                            </button>
                          </div>
                        </div>
                      </form>
                      <hr />
                      <form>
                        <div className="form-group">
                          <label className="d-block text-danger">Delete Account</label>
                          <p className="text-muted font-size-sm">Once you delete your account, there is no going back. Please be certain.</p>
                        </div>
                        <div className='profile-userbuttons'>
                          <button className="btn btn-danger w-auto" type="button" onClick={handleDeleteAccount}>
                            Delete Account
                          </button>
                        </div>
                      </form>

                    </div>
                  )}

                  {activeTab === 'notification' && (
                    <div className="tab-pane" id="notification">
                      <div className="tab-pane" id="notification">
                        <h6>Appointments</h6>
                        <hr />
                        <BookedService/>
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