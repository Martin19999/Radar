/**
 * UserPage.tsx
 * 
 * Show a user's display information
 * 
 */

import Page from "../components/page";
import { useAuth } from "../context/authContext";
import { UserInfo } from "../types";
import { getUserInfo } from "../utils/getUserInfo";
import { formatDate } from "../utils/formatDate";
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link as RouterLink  } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Link, CloseButton, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Tooltip, useMediaQuery } from '@chakra-ui/react'

import "../styles/common.css";
import "../styles/userinfo.css";
import PostsPreview from "../components/postsPreView";

const UserPage = () => {
	const { currentUser, userDetails } = useAuth();
  // make sure the user exists (logged in), is it alway true???/

  const { uid } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const tabNames = ['posts', 'following', 'followers'];
  const tabIndex = tabNames.indexOf(location.pathname.split("/").pop()!) || 0;
  const handleTabsChange = (index: number) => {
    navigate(`/${location.pathname.split("/").slice(1, 3).join('/')}/${tabNames[index]}`);
		console.log(uid, currentUser?.uid, userDetails.displayName)
  }; 

  const [pfpMagnified, setPfpMagnified] = useState(false);
  const [isWideEnough] = useMediaQuery("(min-width: 1040px)");

	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
	
	useEffect( () => {
		// Check if userData is already passed through location.state
		if (location.state?.userinfo) {
			setUserInfo(location.state.userinfo);
		} else {
			// No userData passed, fetch from the server
			try {
				const fetchData = async () => {
					setUserInfo((await getUserInfo(location.pathname.split("/").slice(-2, -1)[0]))[0]);
				}	
				fetchData();
			} catch (error) {
				console.log((error as Error).message)
			}
		}
	}, [location.pathname, location.state]);

	if (!userInfo) {
		return <div>Loading...</div>;
	}	else {
	
		return (
			<Page>
				<div className='userinfo-container'>
					<div className='basic-userinfo-container'>
						<img src={userInfo.photo_url} alt="profile picture" className="userinfo-profile-pic" onClick={()=>{setPfpMagnified(true)}}/>
						<Modal isOpen={pfpMagnified} onClose={()=> setPfpMagnified(false)} variant='displayPfp'>
							<ModalOverlay />
							<ModalContent>
								<ModalCloseButton />
								<ModalBody >
									<img id='magnified-pfp' src={userInfo?.photo_url} alt="profile pic"></img>
								</ModalBody>
							</ModalContent>
						</Modal>
						<div className='basic-nonpic-userinfo-container'>   
							<Tooltip label={userInfo.display_name} aria-label="Full displayName" isDisabled={isWideEnough}>
								<p>{userInfo.display_name}</p>
							</Tooltip>
							<p><strong>Member since: {formatDate(userInfo.created_at.toString())}</strong> </p>
							<button className={ uid===currentUser?.uid ? 'do-not-display' : '' }>Follow</button>
						</div>
					</div>
					<div className='more-userinfo-container'>
						<Tabs index={tabIndex} onChange={handleTabsChange} >
							<TabList>
								<Tab>Posts</Tab>
								<Tab>Following</Tab>
								<Tab>Follwers</Tab> 
							</TabList>

							<TabPanels>
								<TabPanel>
									<>
										<PostsPreview searchCondition="by-user" searchQuery={userInfo.uid}/>
									</>
								</TabPanel>
								<TabPanel>
									<>
										<p>display user pfps in grid, same as followers</p>
									</>
								</TabPanel>
								<TabPanel>
									<>
										<p>display user pfps in grid, same as following</p>
									</>
								</TabPanel>
							</TabPanels>
						</Tabs>
					</div>        
				</div>
			</Page>
			
		)
	}	
  
}

export default UserPage;