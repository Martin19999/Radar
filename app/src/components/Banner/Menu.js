/**
 * Authentication component
 * 
 * Displays clickable text that directs to sign up/ log in pages.
 * 
 */

import { useNavigate, useLocation} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../context/authContext';
import { auth } from '../../firebase';

import { Link, IconButton, Button } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { BsThreeDots } from "react-icons/bs";
import { MdAdd } from "react-icons/md";

import { useMediaQuery } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'

  

const Auth = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const path = location.pathname;
	const { currentUser, userDetails } = useAuth();

	
	const [isWideEnough] = useMediaQuery("(min-width: 768px)");

	const logOut = () => {
		signOut(auth).then(() => {
			navigate('/');
		}).catch((error) => {
			console.log(error);
		})
	}

	return(
		
		
		<div className={(path === '/signup' || path === '/login') ? 'do-not-display' : 'menu'}>
			{ !currentUser &&
				<>
					{!isWideEnough ?
						<Menu>
							<MenuButton className={(path === '/signup' || path === '/login') ? 'hidden' : 'three-dots-button'} 
												as={IconButton}
												icon={<BsThreeDots />}
												fontSize={["sm", "md"]}
												variant="unstyled"/>
							<MenuList>
								<MenuItem as='a' href='/signup'>Sign Up</MenuItem>
								<MenuItem as='a' href='/login'>Log In</MenuItem>
							</MenuList>									
						</Menu> :					
						
						<div className='three-dots-dropdown-content'>
							<Link href='/signup' className={(path === '/signup' || path === '/login') ? 'hidden' : 'signup-button'}>Sign Up</Link> 
							<Link href='/login' className={(path === '/signup' || path === '/login') ? 'hidden' : 'login-button'}>Log In</Link> 							
						</div> 
					}
				</>
			}
			
			{ currentUser && 
				<div className='post-n-setting-buttons'>
					{ isWideEnough ? <Button id='post-button' leftIcon={<MdAdd />} variant='solid' fontSize={["sm", "md"]}>Post</Button> : 
													<Button id='post-button' as={IconButton} icon={<MdAdd />} fontSize={["sm", "md"]} variant='unstyled'/> }
					<Menu>
						<MenuButton className='setting-button' as={Button} backgroundImage={`url(${userDetails.photoURL || "/profile.jpg"})`} backgroundSize='cover'
												_hover={{
													filter: 'none', // Removes any filters that might be causing blur
												}}
												_active={{
													filter: 'none', // Removes any filters that might be causing blur
												}}/>
						<MenuList>
							<MenuItem as='a' href={`/userdetail/${currentUser.uid}`}>User Profile</MenuItem>
							<MenuItem as='a' href='/settings/account'>Settings</MenuItem>
							<MenuItem onClick={() => logOut()}>Log Out</MenuItem>
						</MenuList>
					</Menu>
				</div>
			}
		</div>
	)
	
};

export default Auth;
  