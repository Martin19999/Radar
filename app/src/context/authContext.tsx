/**
 * authContext.tsx
 * 
 * Manages the log in state of the system.
 * 
 */

import { auth } from '../firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

export interface AuthContextType {
  currentUser: User | null;
  userDetails: UserDetails;
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetails>>;
}

interface UserDetails {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  creationTime: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails>({ displayName: null, email: null, photoURL: null, creationTime: null });
  const [loading, setLoading] = useState(true); // Initial loading state
 
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if(user){
        setCurrentUser(user);
        setLoading(false); // Set loading to false once we get the user status

        setUserDetails({
          displayName: user.displayName!,
          email: user.email!,
          photoURL: user.photoURL || "/profile.jpg",
          creationTime: (user.metadata.creationTime!.match(/\d{2} \w{3} \d{4}/)?.[0]) ?? " "
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
    <AuthContext.Provider value={ {currentUser, userDetails, setUserDetails} }>
      {children}
    </AuthContext.Provider> 
  );
};