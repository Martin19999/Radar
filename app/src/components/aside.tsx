/**
 * Aside component
 * 
 * Displays user info when logged in, or promotional content when not logged in, 
 * on the side of the home page
 * 
 */

import { useAuth } from '../context/authContext';
import React from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/common.css";
import "../styles/aside.css";


const Aside: React.FC = (e) => {
	
	const navigate = useNavigate();
	const { currentUser, userDetails } = useAuth();

	return(
		<aside className="userinfo">
			<div className="user-sidebar-container"> 
				{ currentUser ?
					<>
						<img src={userDetails.photoURL!} className="profile-pic" onClick={() => navigate(`/userdetail/${currentUser.uid}/posts`)}/>
						<div className="siderbar-info-no-pic">
							<h2><strong>{userDetails.displayName}</strong></h2>
							<p><strong>Joined: </strong>{userDetails.creationTime}</p>
							<p><strong>Posts: </strong> </p>
							<p><strong>Follow: </strong> </p>
							{/* <p> recent follow</p> */}
							<p><strong>Followers: </strong> </p>
							{/* <p>recent followers</p> */}
						</div>
					</>	:
					<>
						<h2><strong>You might like</strong></h2>
						<p>dislay user in cards, add a follow button to each</p>
					</>
				
				} 
			</div>      		
		</aside>
	)
};

export default Aside;



