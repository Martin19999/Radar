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
import React, { useEffect } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link, IconButton, Button, useMediaQuery, Menu, MenuButton, MenuList, MenuItem, useColorMode, Switch } from '@chakra-ui/react';
import { BsThreeDots } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

import "../../styles/common.css";

const MyMenu = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const path = location.pathname;
	const { currentUser, userDetails } = useAuth();
	
	const [isWideEnough] = useMediaQuery("(min-width: 768px)");
	const [pfpAsBackground] = useMediaQuery("(max-width: 850px)");
  const { colorMode, setColorMode } = useColorMode();

	const logOut = () => {
		signOut(auth).then(() => {
			navigate('/');
		}).catch((error) => {
			console.log(error);
		})
	}

	const handleSwitchChange = () => {
    const newColorMode = colorMode === 'dark' ? 'light' : 'dark';
    localStorage.setItem('chakra-ui-color-mode', newColorMode);
    setColorMode(newColorMode);
  };

  useEffect(() => {
    const savedColorMode = localStorage.getItem('chakra-ui-color-mode');
    if (savedColorMode) {
      setColorMode(savedColorMode);
    }
  }, [setColorMode]);

	return(
		<div className={(path === '/signup' || path === '/login') ? 'do-not-display' : 'menu'}>
			{ !currentUser &&
				<>
					{!isWideEnough ?
						<Menu>
							<MenuButton className={(path === '/signup' || path === '/login') ? 'hidden' : 'three-dots-button'} 
													as={IconButton}
													icon={<BsThreeDots />}/>
							<MenuList>
								<MenuItem as={RouterLink} to='/signup' data-cy='signup-button'>Sign Up</MenuItem>
								<MenuItem as={RouterLink} to='/login' data-cy='login-button'>Log In</MenuItem>
							</MenuList>									
						</Menu> :					
						
						<div className='three-dots-dropdown-content'>
							<Link as={RouterLink} to='/signup' className={(path === '/signup' || path === '/login') ? 'hidden' : 'signup-button'}
										data-cy='signup-button'>Sign Up</Link> 
							<Link as={RouterLink} to='/login' className={(path === '/signup' || path === '/login') ? 'hidden' : 'login-button'}
										data-cy='login-button'>Log In</Link> 							
						</div> 
					} 
				</>
			}
			
			{ currentUser && 
				<div className='post-n-setting-buttons'>
					{ isWideEnough ? <Button id='post-button' leftIcon={<MdAdd />} >Post</Button> : 
													 <Button id='post-button' as={IconButton} icon={<MdAdd />} /> }
					<Menu closeOnSelect={false}>
						{pfpAsBackground ? 
						<MenuButton as={Button} backgroundImage={`url(${userDetails.photoURL})`} alt="profile picture" variant='menuButton' data-cy='setting-button'/> :
						<MenuButton as={IconButton} icon={<IoSettingsOutline />} data-cy='setting-button'/>
						}
						
						<MenuList>
							<MenuItem> Night Mode <Switch isChecked={colorMode==='dark'}
																						onChange={()=> { handleSwitchChange(); }}
																						data-cy='mode-menuitem'/> </MenuItem>
							<MenuItem as={RouterLink} to={`/userdetail/${currentUser.uid}/posts`} data-cy='userprofile-menuitem'>User Profile</MenuItem>
							<MenuItem as={RouterLink} to='/settings/account' data-cy='settings-menuitem'>Settings</MenuItem>
							<MenuItem onClick={() => logOut()} data-cy='logout-menuitem'>Log Out</MenuItem>
						</MenuList> 		
					</Menu>
				</div>
			}
		</div>
	)
};

export default MyMenu;
  