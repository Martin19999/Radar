/**
 * SignupPage.tsx
 * 
 * Sign up page. 
 * 
 */

import Page from "../components/page";
import { useAuth } from '../context/authContext';
import { syncUserData } from "../utils/syncUserData";
import { useEasyToast } from '../components/toast';
import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import DOMPurify from 'dompurify';
import { FormControl, FormLabel, InputGroup, InputRightElement, Input, Button, IconButton, CloseButton, Link } from '@chakra-ui/react';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import "../styles/common.css";
import "../styles/authpages.css";


const SignupPage = () => {
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

	const signup = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    setIsSubmitting(true);

    // const sanitizedDisplayName = DOMPurify.sanitize(name.replace(/\s/g, ""));

		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email.toLowerCase(), password);
			await updateProfile(userCredential.user, {
				displayName: name.replace(/\s/g, ""),
				photoURL: "/profile.jpg"
			});
			const newUserDetails = {
				...userDetails,
				displayName: name.replace(/\s/g, ""),
				photoURL: "/profile.jpg",
				creationTime: userCredential.user.metadata.creationTime!.match(/\d{2} \w{3} \d{4}/)![0],
				email: email.toLowerCase() };
			setUserDetails(newUserDetails);
			showSuccess('Account created!');
			await syncUserData({
				uid: userCredential.user.uid,
				displayName: newUserDetails.displayName,
				photoURL: newUserDetails.photoURL,
				isActive: true
			});
			navigate('/', { state: { fresh: true } });
		} catch (error) {
			showError((error as Error).message); // what if it's not firebase error?
		} finally {
			setIsSubmitting(false);
		}
	}
      

	return(
		<>
			<Page>
				<div className='auth-container'>
					<div className='description-container'>
						<h1>Join Our Website</h1>
						<ol>
							<li>Reason 1</li>
							<li>Reason 2</li>
							<li>Reason 3</li>
							<li>Reason 4</li>
						</ol>
					</div>
					<div className='form-container'>
						<Link as={RouterLink} to='/'><CloseButton /></Link>
						<h1>Create an Account</h1>
						<form onSubmit={signup}>
							<FormControl isRequired>
								<FormLabel>Email</FormLabel>
								<Input placeholder='Email' data-cy='signup-email'
												value= {email || ''} 
												onChange={(e) => {setEmail(e.target.value); }} />
							</FormControl>
							<FormControl isRequired>
								<FormLabel>Display Name</FormLabel>
								<Input placeholder='1-25 characters' data-cy='signup-displayName'
												value= {name || ''} 
												onChange={(e) => {setName(e.target.value); }} 
												maxLength={25} />
							</FormControl>
							<FormControl isRequired>
								<FormLabel>Password</FormLabel>
								<InputGroup>
									<Input type={showPassword ? 'text' : 'password'} data-cy='signup-password'
												placeholder='6-25 characters'
												value= {password || ''} 
												onChange={(e) => {setPassword(e.target.value); }} 
												maxLength={25} />
									<InputRightElement>
										<Button as={IconButton} icon={showPassword ? <IoMdEye/> :<IoMdEyeOff/>} onClick={handleShowPassWordClick} variant="unstyled"/>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<Link as={RouterLink} to='/login' variant='textLinkInForms'>Have an account? Log in here</Link>
							<Button type="submit"
											isLoading={isSubmitting}
											isDisabled={!isFormValid() || isSubmitting}
											variant="bigFormSubmitButton"
											data-cy='signup-submit'>Sign Up</Button>       
						</form>
					</div>
				</div>
			</Page>
		</>
	);
}

export default SignupPage;