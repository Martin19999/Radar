// src/utils/syncUserData.ts
import { FirebaseUser } from '../types';  

/**
 * Syncs user data with the backend server.
 * @param user - The user data to sync.
 */
export const syncUserData = (user: FirebaseUser): void => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/users/sync-user`;  // Adjust as necessary

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      isActive: user.isActive
    }),
  })
  .then(response => {
    if (!response.ok) {
      // This throws an Error which will be caught by the catch block below
      throw new Error(`Server responded with an error: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log('User data synced:', data))
  .catch(error => { console.log('Error syncing user data:', error.message);
                    setTimeout(() => syncUserData(user), 3000); // Retry after 3 seconds
  });
};
