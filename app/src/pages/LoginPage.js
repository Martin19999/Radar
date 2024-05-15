/**
 * LoginPage.js
 * 
 * Login page. 
 * 
 */

import LogIn from "../components/AuthPages/LogIn.js";
import Banner from "../components/Banner/index.js";
import Content from "../components/Content/index.js";

import "../styles/common.css";
import "../styles/authpages.css";

const LoginPage = () => {
	return(
		<>
			<Banner />
			<Content>
				<LogIn />
			</Content>
		</>
	);
}

export default LoginPage;