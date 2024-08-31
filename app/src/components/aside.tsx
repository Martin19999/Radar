/**
 * Aside component
 * 
 * Displays user info when logged in, or promotional content when not logged in, 
 * on the side of the home page
 * 
 */

import { useAuth } from '../context/authContext';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/common.css";
import "../styles/aside.css";
import { getNumofPosts } from '../utils/getNumofPosts';
import { getRelations } from '../utils/getRelations';


const Aside: React.FC = (e) => {
	
	const navigate = useNavigate();
	const { currentUser, userDetails } = useAuth();
	const [numofPosts, setNumofPosts] = useState(0);
	const [numofFollowings, setNumofFollowings] = useState(0);
	const [numofFollowers, setNumofFollowers] = useState(0);

	useEffect(() => {
		if(currentUser){
			const fetchData = async () => {
				setNumofPosts(await getNumofPosts(currentUser.uid));
				setNumofFollowings((await getRelations<{count3: number}>(currentUser.uid, '', 'find-num-following')).count3);
				setNumofFollowers((await getRelations<{count4: number}>(currentUser.uid, '', 'find-num-followers')).count4);
			}
			fetchData();
		}
		
	},[]);

	return(
		<aside className="userinfo">
			<div className="user-sidebar-container"> 
				{ currentUser ?
					<>
						<img src={userDetails.photoURL!} className="profile-pic" onClick={() => navigate(`/userdetail/${currentUser.uid}/posts`)}/>
						<div className="siderbar-info-no-pic">
							<h2><strong>{userDetails.displayName}</strong></h2>
							<p><strong>Joined: </strong>{userDetails.creationTime}</p>
							<p><strong>Posts: </strong>{numofPosts} </p>
							
							<p><strong>Following: </strong> {numofFollowings}</p>
							{/* <p> recent follow</p> */}
							<p><strong>Followers: </strong> {numofFollowers}</p>
							{/* <p>recent followers</p> */}
						</div>
					</>	:
					<>
						<h2><strong>Hi! Join Radar today to share your ideas with millions of users! </strong></h2>
						
						
					</>
				
				} 
			</div>      		
		</aside>
	)
};

export default Aside;



