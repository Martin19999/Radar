/**
 * Menu component
 * 
 * When not logged in: displays clickable text that directs to sign up/ log in pages
 * When logged in: 
 * 		displays
 * 				1. button1 that allows users to post
 * 				2. button2 that contains: view profile, settings, log out
 * 
 */
import { useAuth } from '../../context/authContext';
import React from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link, IconButton, Button, useMediaQuery, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { BsThreeDots } from "react-icons/bs";
import { MdAdd } from "react-icons/md";

import "../../styles/common.css";

const MyMenu = () => {
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
													variant="unstyled"
													display="flex"/>
							<MenuList>
								<MenuItem as={RouterLink} to='/signup'>Sign Up</MenuItem>
								<MenuItem as={RouterLink} to='/login'>Log In</MenuItem>
							</MenuList>									
						</Menu> :					
						
						<div className='three-dots-dropdown-content'>
							<Link as={RouterLink} to='/signup' className={(path === '/signup' || path === '/login') ? 'hidden' : 'signup-button'}>Sign Up</Link> 
							<Link as={RouterLink} to='/login' className={(path === '/signup' || path === '/login') ? 'hidden' : 'login-button'}>Log In</Link> 							
						</div> 
					}
				</>
			}
			
			{ currentUser && 
				<div className='post-n-setting-buttons'>
					{ isWideEnough ? <Button id='post-button' leftIcon={<MdAdd />} variant='solid' fontSize={["sm", "md"]}>Post</Button> : 
													 <Button id='post-button' as={IconButton} icon={<MdAdd />} fontSize={["sm", "md"]} variant='unstyled'/> }
					<Menu>  
						<MenuButton className='setting-button' as={Button} backgroundImage={`url(${userDetails.photoURL})`} backgroundSize='cover' 
												_hover={{
													filter: 'none', 
												}}
												_active={{
													filter: 'none', 
											}}/>
						<MenuList>
							<MenuItem as={RouterLink} to={`/userdetail/${currentUser.uid}/posts`}>User Profile</MenuItem>
							<MenuItem as={RouterLink} to='/settings/account'>Settings</MenuItem>
							<MenuItem onClick={() => logOut()}>Log Out</MenuItem>
						</MenuList> 
							
					</Menu>
				</div>
			}
		</div>
	)
};

export default MyMenu;
  