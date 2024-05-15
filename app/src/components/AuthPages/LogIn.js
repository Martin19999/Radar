/**
 * Login component
 * 
 * Manages the log in system.
 * 
 */

import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FormControl, FormLabel, InputGroup, InputRightElement, Input, Button, IconButton, CloseButton, Link } from '@chakra-ui/react';
import { useEasyToast } from '../toast';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import "../../styles/common.css";
import "../../styles/authpages.css";

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassWordClick = () => setShowPassword(!showPassword);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSuccess, showError } = useEasyToast();

  const navigate = useNavigate();
  
  const isFormValid = () => {
    return (email?.replace(/\s/g, "") ?? "").length > 0 && (password?.replace(/\s/g, "") ?? "").length >= 6;
  };

  const login = (e) => { 
    e.preventDefault();
    setIsSubmitting(true);
    signInWithEmailAndPassword(auth, email, password)
    .then(() => { showSuccess("You're logged in!");
                  navigate('/');
    }).catch((error) => {
      showError(error.message);
    }).finally(() => {
      setIsSubmitting(false); 
    });
  };

  return (
    <div className='auth-container'>
      <div className='form-container'>
        <Link as={RouterLink} to='/'><CloseButton /></Link>
        <h1>Log In</h1>
        <form onSubmit={login}>
          <FormControl isRequired mt={5}>
            <FormLabel>Email</FormLabel>
            <Input value= {email || ''} 
                  onChange={(e) => {setEmail(e.target.value); }} />
          </FormControl>
          <FormControl isRequired mt={5} mb={5}>
            <FormLabel>Password</FormLabel>
            <InputGroup size='md'>
              <Input pr='4.5rem'
                    type={showPassword ? 'text' : 'password'}
                    value= {password || ''} 
                    onChange={(e) => {setPassword(e.target.value); }} />
              <InputRightElement width='2.5rem'>
                <Button as={IconButton} icon={showPassword ? <IoMdEye/> :<IoMdEyeOff/>} variant="unstyled" h='1.75rem' size='sm' onClick={handleShowPassWordClick}/>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Link as={RouterLink} to='/signup'>Do not have an account? Sign up here</Link>
          <Button variant="outline"
                  type="submit"
                  width="full"
                  mt={10}
                  isLoading={isSubmitting}
                  isDisabled={!isFormValid() || isSubmitting }>Log In</Button>       
        </form>
      </div> 
    </div>
  )
}

export default LogIn;