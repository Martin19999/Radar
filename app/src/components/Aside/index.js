/**
 * Aside component
 * 
 * Displays user info when logged in
 * 
 */


import "../../styles/common.css";
import "../../styles/aside.css";

import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/authContext';



const Aside = (e) => {
	
	const navigate = useNavigate();
	const { currentUser, userDetails } = useAuth();

	return(
		<aside className="userinfo">
			{ currentUser ?
				<div className="user-sidebar-container"> 
					<img src={userDetails.photoURL} alt="pfp" className="profile-pic" onClick={() => navigate(`/userdetail/${currentUser.uid}`)}/>
					<p>{userDetails.displayName}</p>
					<p>Joined: {userDetails.creationTime}</p>
					<p>Posts: [int]</p>
					<p>Follow: [user Obj]</p>
					<p>Followers: [user Obj]</p>
				</div>
				


				:<h2>Please Log In</h2>
			}       
			
			
		</aside>
	)
};

export default Aside;



