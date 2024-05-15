/**
 * SignupPage.js
 * 
 * Sign up page. 
 * 
 */

import Banner from "../components/Banner/index.js";
import Content from "../components/Content/index.js";
import SignUp from "../components/AuthPages/SignUp.js";

import "../styles/common.css";
import "../styles/authpages.css";

const SignupPage = () => {
	return(
		<>
			<Banner />
			<Content>
				<SignUp />
			</Content>
		</>
	);
}

export default SignupPage;