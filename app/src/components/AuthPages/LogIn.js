import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import "../../styles/common.css";
import "../../styles/authpages.css";

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const login = (e) => { 
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential)
      navigate('/');
    }).catch((error) => {
      setErrorMessage(error.message);
    });

  };

  const isFormValid = () => {
    return email.length > 0 && password.length >= 6;
  };
  
  function clearError() {
    setErrorMessage('');
  }


  return (
    <div className='auth-container'>
      <form onSubmit={login} className='login-form'>
        <div className='form-container'>
          <button onClick={() => navigate('/')}>x</button>
          <h1>Log In</h1>
          <input type='text' placeholder='email' value= {email || ''} onChange={(e) => {setEmail(e.target.value); clearError();}}></input>
          <input type='password' placeholder='password' value= {password || ''} onChange={(e) => {setPassword(e.target.value); clearError();}}></input>
          <p className={errorMessage.length===0 ? 'hidden' : 'error-msg'}>{errorMessage}</p>
          <p onClick={() => navigate('/signup')}>Sign Up</p>
          <button type="submit" disabled={!isFormValid()}>Log In</button>
          
        </div>
        
      </form>
    </div>
  )
}

export default LogIn;