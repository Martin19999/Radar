/**
 * Authentication component
 * 
 * Displays clickable text that directs to sign up/ log in pages.
 * 
 */

import { useNavigate, useLocation} from 'react-router-dom';

const Auth = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const path = location.pathname;

	return(
		<div className='auth'>
			<p onClick={() => navigate('/signup')} className={path === '/signup' ? 'hidden' : ''}>Sign Up</p>
			<p onClick={() => navigate('/login')} className={path === '/login' ? 'hidden' : ''}>Log In</p>
		</div>
	)
	
};

export default Auth;
  