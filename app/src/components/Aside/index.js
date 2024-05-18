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
					<img src={userDetails.photoURL} className="profile-pic" onClick={() => navigate(`/userdetail/${currentUser.uid}/posts`)}/>
					<div className="siderbar-info-no-pic">
						<p>{userDetails.displayName}</p>
						<p><strong>Joined: </strong>{userDetails.creationTime}</p>
						<p><strong>Posts: </strong> [int]</p>
						<p><strong>Follow: </strong> [int]</p>
						<p><strong>Followers: </strong> [int]</p>
					</div>		
				</div>:
				<>
					<h2>Please Log In</h2>
					<p>Wanna switch to night mode? Log in now</p>
				</>
				
			}       		
		</aside>
	)
};

export default Aside;



