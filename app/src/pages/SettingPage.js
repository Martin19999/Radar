/**
 * SettingPage.js
 * 
 * Change settings.
 * 
 */

import Banner from "../components/Banner/index.js";
import Content from "../components/Content/index.js";
import Settings from "../components/Settings/index.js";

import "../styles/common.css";
import "../styles/settings.css";


const UserPage = () => {
	return(
		<>
			<Banner />
			<Content>
				<Settings />
			</Content>
		</>
	);
}

export default UserPage;