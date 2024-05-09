/**
 * Authentication component
 * 
 * Displays clickable text that directs to sign up/ log in pages.
 * 
 */

import { useNavigate, useLocation} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../context/authContext';
import { auth } from '../../firebase';


  

const Auth = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const path = location.pathname;
	const { currentUser, userDetails } = useAuth();

	const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

	const [menuOpen, setMenuOpen] = useState(window.innerWidth > 768);

	const logOut = () => {
		signOut(auth).then(() => {
			navigate('/');
		}).catch((error) => {
			console.log(error);
		})
	}

	useEffect(() => {
    if (!currentUser) {
      setIsHovering(false); 
    }
  }, [currentUser]);

	useEffect(() => {
    const handleResize = () => {
      // Automatically open the menu if the window width is greater than 900px
      if (window.innerWidth > 768) {
        setMenuOpen(true);
      } else {
        setMenuOpen(false);
      }
    };

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

	const toggleMenu = () => {
    if (window.innerWidth <= 768) {
      setMenuOpen(!menuOpen);
    }
  };


	return(
		<div className={(path === '/signup' || path === '/login') ? 'do-not-display' : 'menu'}>
			{ !currentUser &&
				<>
					<button className={(path === '/signup' || path === '/login') ? 'hidden' : 'three-dots-button'} onClick={toggleMenu}>...</button>
					<div className='three-dots-dropdown-content'>
					{ menuOpen &&
						<>
							{ !currentUser && <button onClick={() => navigate('/signup')} className={(path === '/signup' || path === '/login') ? 'hidden' : 'signup-button'}>Sign Up</button> }
							{ !currentUser && <button onClick={() => navigate('/login')} className={(path === '/signup' || path === '/login') ? 'hidden' : 'login-button'}>Log In</button> }
						</>

					}
						
					</div>
				</>
			}
			
			{ currentUser && 
				<div className='post-n-setting-buttons'>
					<button>+</button>
					<button className='setting-button'
						onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
						style={{backgroundImage: `url(${userDetails.photoURL || "/profile.jpg"})`}}></button>
				</div>
			}
			{ isHovering && (
					<div className="dropdown-content" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
						<button onClick={() => navigate(`/userdetail/${currentUser.uid}`)}>User Profile</button>
						<button onClick={() => navigate("/settings/account")}>Settings</button>
						<button onClick={() => logOut()}>Log Out</button>
					</div>
				)
				
			}
		
		</div>
	)
	
};

export default Auth;
  