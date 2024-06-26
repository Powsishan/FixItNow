import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import './login.css';
import log from '../media/Login.svg';
import sign from '../media/sign.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


function UsrLogin() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);

  

  

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  const handleForgotPasswordClick = () => {
   
  };

  const hideMessages = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  

  useEffect(() => {
    const messageTimer = setTimeout(hideMessages, 3000);

    // Clear the timer when the component unmounts or when a new message appears
    return () => clearTimeout(messageTimer);
  }, [successMessage, errorMessage]);

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector('.sign-in-form'));
    const formDataObj = Object.fromEntries(formData.entries());
  
    const errorMessages = [];
  
    if (formDataObj.u_username.trim() === '') {
      errorMessages.push('Please fill out the username field');
    }
  
    if (formDataObj.password.trim() === '') {
      errorMessages.push('Please fill out the password field');
    }
  
    if (errorMessages.length > 0) {
      setErrorMessage(
        <ul>
          {errorMessages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      );
      return;
    }
  
    try {
      const response = await Axios.post('http://localhost:3001/usrlogin', formDataObj);
  
      if (response.status === 200 && response.data.message === 'Login successful') {
        localStorage.setItem('u_username', formDataObj.u_username);
        toast.success('Login successful');
        
        window.location.href = '/ServiceProviderList';
        
      } else {
        setErrorMessage('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Login failed ');
    }
  };
  
  
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector('.sign-up-form'));
    const formDataObj = Object.fromEntries(formData.entries());
  
    const errorMessages = [];
  
    if (formDataObj.u_username.trim() === '') {
      errorMessages.push('Please fill out the username field');
    }
  
    if (formDataObj.email.trim() === '') {
      errorMessages.push('Please fill out the email field');
    }
  
    if (formDataObj.password.trim() === '') {
      errorMessages.push('Please fill out the password field');
    }
  
    if (formDataObj.confirmPassword.trim() === '') {
      errorMessages.push('Please fill out the confirm password field');
    }
  
    if (formDataObj.password !== formDataObj.confirmPassword) {
      errorMessages.push('Passwords do not match');
    }
  
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    if (errorMessages.length === 0) {
      if (formDataObj.password.length < 8) {
        errorMessages.push('Password must have at least 8 characters');
      }
  
      if (!/[A-Z]/.test(formDataObj.password)) {
        errorMessages.push('Password must include uppercase letters');
      }
  
      if (!/[a-z]/.test(formDataObj.password)) {
        errorMessages.push('Password must include lowercase letters');
      }
  
      if (!/\d/.test(formDataObj.password)) {
        errorMessages.push('Password must include numbers');
      }
  
      if (!/[@$!%*?&]/.test(formDataObj.password)) {
        errorMessages.push('Password must include symbols');
      }
    }
  
    if (errorMessages.length > 0) {
      setErrorMessage(
        <ul>
          {errorMessages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      );
      return;
    }
  
    try {
      const response = await Axios.post('http://localhost:3001/registerusr', formDataObj);
  
      if (response.status === 200) {
       
        toast.success('Registration successful');

        
      } else if (response.status === 409) {
        setErrorMessage('Username or email already in use.');
      } else {
        setErrorMessage('Registration failed');
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Registration failed: ' + error.message);
      }
    }
  };
  
  return (
    <div className={`loginContainer ${isSignUpMode ? 'sign-up-mode' : ''}`}>
        <ToastContainer />
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form loginForm" onSubmit={handleSignInSubmit}>
            <h2 className="title">Sign in</h2>
            <p className="social-text loginp"> Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faGoogle} className='my-auto mx-auto' />
              </a>
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faLinkedinIn} className='my-auto mx-auto' />
              </a>
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className='my-auto mx-auto' />
              <input className='LoginInput' type="text" placeholder="username" name="u_username" />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className='my-auto mx-auto' />
              <input className='LoginInput' type="password" placeholder="password" name="password" />
            </div>
            <button className='btn' type="submit" onClick={handleSignInSubmit}>Sign In</button>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && (
              <Stack spacing={2}>
              <Alert severity="error">{errorMessage}</Alert>
            </Stack>
            )}
            <div>
            <button className="btn transparent" onClick={handleForgotPasswordClick}>
              Forgot Password
            </button>
            </div>
          </form>
          
          <form action="#" className="sign-up-form loginForm" onSubmit={handleSignUpSubmit}>
            <h2 className="title">Sign up</h2>
            <div className="social-media">
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faGoogle} className='my-auto mx-auto' />
              </a>
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faLinkedinIn} className='my-auto mx-auto' />
              </a>
            </div>            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className='my-auto mx-auto' />
              <input className='LoginInput' type="text" placeholder="Username" name="u_username" />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} className='my-auto mx-auto' />
              <input className='LoginInput' type="email" placeholder="E-mail" name="email" />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className='my-auto mx-auto' />
              <input className='LoginInput' type="password" placeholder="Password" name="password" />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className='my-auto mx-auto' />
              <input className='LoginInput' type="password" placeholder="Confirm Password" name="confirmPassword" />
            </div>
            <button className='btn' type="submit">Sign Up</button>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="contentLogin">
            <h3 className='loginh3'>New here?</h3>
            <p className='loginp'>
              Welcome, Get registred with us and start your journey with
            </p>
            <button className="btn transparent" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </div>
          <img src={sign} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="contentLogin">
            <h3 className='loginh3'>Already a user? </h3>
            <p className='loginp'>
              Login to use our services.
            </p>
            <button  className="btn transparent" id="sign-in-btn" onClick={handleSignInClick}>
              Sign In
            </button>
            <img src={log} className="image" alt="" />

          </div>
          
        </div>
      </div>
    </div>
  );
}

export default UsrLogin;
