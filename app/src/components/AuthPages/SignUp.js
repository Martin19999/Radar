import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import WebDescription from './WebDescription';
import { useAuth } from '../../context/authContext';
import "../../styles/common.css";
import "../../styles/authpages.css";


const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const { currentUser, userDetails, setUserDetails } = useAuth();

  const signup = (e) => { 
    e.preventDefault();

    setEmailError(null);
    setNameError(null);
    setPasswordError(null);
 
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      updateProfile(userCredential.user, {
        displayName: name
      }).then(() => {
        setUserDetails({
          ...userDetails,
          displayName: name
        });
        navigate('/', { state:{ fresh: true } });
      }).catch((error) => {
        console.error('Error updating user profile:', error.message);
      });
    }).catch((error) => {
      // console.log(error)
      const errorCode = error.code;
      const errorMessage = error.message;
      handleSignUpError(errorCode, errorMessage);
    });
  };

  function handleSignUpError(errorCode, errorMessage) {
    if (errorMessage.includes('auth/email-already-in-use')) {
      setEmailError('The email address is already in use.');
    } else if (errorMessage.includes('auth/invalid-email')) {
      setEmailError('The email address is not valid.');
    } else if (errorMessage.includes('password')) {
      setPasswordError('The password should be six digits at least.')
    } else {
      console.log('Error signing up:', errorMessage);
      alert('Error signing up: ' + errorMessage);
    }
  }

  function clearEmailError() {
    setEmailError(null);
  }
  function clearNameError() {
    setNameError(null);
  }
  function clearPasswordError() {
    setPasswordError(null);
  }

  const isFormValid = () => {
    return email.length > 0 && name.length > 0 && password.length >= 6;
  };

 
  return (
    <div className='auth-container'>
      <WebDescription />
      <form onSubmit={signup} className='signup-form'>
        <div className='form-container'>
          <button onClick={() => navigate('/')}>x</button>
          <h1>Create an Account</h1>
          <input 
            type='text' 
            placeholder='Email' 
            value= {email || ''} 
            onChange={(e) => {setEmail(e.target.value); clearEmailError();}}
            className={emailError ? 'field-error' : ''}>
          </input>
          <p className={ !emailError ? 'hidden' : 'error-msg'}>{emailError}</p>

          <input 
            type='text' 
            placeholder='Name' 
            value= {name || ''} 
            onChange={(e) => {setName(e.target.value); clearNameError();}} 
            maxLength={25}
            className={nameError ? 'field-error' : ''}>
          </input>
          <p>{name.length}/25 characters max.</p>

          <input 
            type='password' 
            placeholder='Password' 
            value= {password || ''} 
            onChange={(e) => {setPassword(e.target.value); clearPasswordError();}} 
            maxLength={25}
            className={passwordError ? 'field-error' : ''}>
          </input>
          { passwordError ? 
            <p className={ !password ? 'hidden' : 'error-msg'}>{passwordError}</p> : 
            <p>Password should be at least {password.length}/6 characters.</p>}
          
          <p onClick={() => navigate('/login')}>Log In Instead</p>
          <button type="submit" disabled={!isFormValid()}>Sign Up</button>
        </div>
        
        
      </form>
    </div>
  )
}

export default SignUp;