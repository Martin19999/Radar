/**
 * UserPage.js
 * 
 * Show a user's information
 * 
 */

import Banner from "../components/Banner/index.js";
import Content from "../components/Content/index.js";
import UserInfo from "../components/UserInfo/index.js";

import "../styles/common.css";


const UserPage = () => {
	return(
		<>
			<Banner />
			<Content>
				<UserInfo />
			</Content>
		</>
	);
}

export default UserPage;