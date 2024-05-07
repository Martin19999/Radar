/**
 * LogIn.js
 * 
 * Login page. 
 * 
 */

import LogIn from "../components/AuthPages/LogIn.js";
import Banner from "../components/Banner/index.js";
import Content from "../components/Content/index.js";

import "../styles/authpages.css";
import "../styles/common.css";


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