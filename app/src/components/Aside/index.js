/**
 * Aside component
 * 
 * Displays user info when logged in, or promotional content when not logged in, 
 * on the side of the home page
 * 
 */

import { useAuth } from '../../context/authContext';
import { useNavigate } from "react-router-dom";

import "../../styles/common.css";
import "../../styles/aside.css";

const Aside = (e) => {
	
	const navigate = useNavigate();
	const { currentUser, userDetails } = useAuth();

	return(
		<aside className="userinfo">
			{ currentUser ?
				<div className="user-sidebar-container"> 
					<img src={userDetails.photoURL} alt="pfp" className="profile-pic" onClick={() => navigate(`/userdetail/${currentUser.uid}/posts`)}/>
					<div className="siderbar-info-no-pic">
						<p>{userDetails.displayName}</p>
						<p>Joined: {userDetails.creationTime}</p>
						<p>Posts: [int]</p>
						<p>Follow: [user Obj]</p>
						<p>Followers: [user Obj]</p>
					</div>		
				</div>
				:<h2>Please Log In</h2>
			}       		
		</aside>
	)
};

export default Aside;



