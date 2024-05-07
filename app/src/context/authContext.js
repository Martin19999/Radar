import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true); // Initial loading state

 
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if(user){
        setCurrentUser(user);
        setLoading(false); // Set loading to false once we get the user status
        setUserDetails({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL || "/profile.jpg",
          creationTime: user.metadata.creationTime.match(/\d{2} \w{3} \d{4}/)
          // ...
        });
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    })
		return () => {
			listen();
		}
  }, [])

  if (loading) {
    return <div>Loading...</div>; // Or any loading spinner or similar component
  }

  return (
    <AuthContext.Provider value={ {currentUser, userDetails} }>
      {children}
    </AuthContext.Provider> 
  );
};