/**
 * SignUp component
 * 
 * Manages the sign up system.
 * 
 */

import { useAuth } from '../../context/authContext';
import WebDescription from './WebDescription';
import { useEasyToast } from '../toast';
import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FormControl, FormLabel, InputGroup, InputRightElement, Input, Button, IconButton, CloseButton, Link } from '@chakra-ui/react';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import "../../styles/common.css";
import "../../styles/authpages.css";

const SignUp = () => {
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassWordClick = () => setShowPassword(!showPassword);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { showSuccess, showError } = useEasyToast();

  const { userDetails, setUserDetails } = useAuth();
  const navigate = useNavigate();

  const isFormValid = () => {
    return (email?.replace(/\s/g, "") ?? "").length > 0 && (name?.replace(/\s/g, "") ?? "").length > 0 && (password?.replace(/\s/g, "") ?? "").length >= 6;
  };

  const signup = (e) => { 
    e.preventDefault();
    setIsSubmitting(true);

    createUserWithEmailAndPassword(auth, email.toLowerCase(), password)
    .then((userCredential) => {
      updateProfile(userCredential.user, {
        displayName: name.replace(/\s/g, ""),
        photoURL: "/profile.jpg"
      }).then(() => {
        setUserDetails({
          ...userDetails,
          displayName: name.replace(/\s/g, ""),
          photoURL: "/profile.jpg",
          creationTime: userCredential.user.metadata.creationTime.match(/\d{2} \w{3} \d{4}/),
          email: email.toLowerCase()
        });
        showSuccess('Account created!');
        navigate('/', { state:{ fresh: true } });
      }).catch((error) => {
        showError(error.message);
      });
    }).catch((error) => {
      showError(error.message);
    }).finally(() => {
      setIsSubmitting(false); 
    });
  };

  return (
    <div className='auth-container'>
      <WebDescription />
      <div className='form-container'>
        <Link as={RouterLink} to='/'><CloseButton /></Link>
        <h1>Create an Account</h1>
        <form onSubmit={signup}>
          <FormControl isRequired mt={5}>
            <FormLabel>Email</FormLabel>
            <Input placeholder='Email'
                    value= {email || ''} 
                    onChange={(e) => {setEmail(e.target.value); }} />
          </FormControl>
          <FormControl isRequired mt={5}>
            <FormLabel>Display Name</FormLabel>
            <Input placeholder='1-25 characters'
                    value= {name || ''} 
                    onChange={(e) => {setName(e.target.value); }} 
                    maxLength={25} />
          </FormControl>
          <FormControl isRequired mt={5} mb={5}>
            <FormLabel>Password</FormLabel>
            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={showPassword ? 'text' : 'password'}
                placeholder='6-25 characters'
                value= {password || ''} 
                onChange={(e) => {setPassword(e.target.value); }} 
                maxLength={25} />
              <InputRightElement width='2.5rem'>
                <Button as={IconButton} icon={showPassword ? <IoMdEye/> :<IoMdEyeOff/>} variant="unstyled" h='1.75rem' size='sm' onClick={handleShowPassWordClick}/>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Link as={RouterLink} to='/login'>Have an account? Log in here</Link>
          <Button variant="outline"
                  type="submit"
                  width="full"
                  mt={10}
                  isLoading={isSubmitting}
                  isDisabled={!isFormValid() || isSubmitting }>Sign Up</Button>       
        </form>
      </div>
    </div>
  )
}

export default SignUp;