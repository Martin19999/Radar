// src/utils/changeRelation.ts

/**
 * Syncs user data with the backend server.
 * @param user - The user data to sync.
 */
export const changeRelation = (actor_uid: string, acceptor_uid: string, request_type: string): void => {
  const url = 'http://localhost:3001/api/update-relation';  // Adjust as necessary

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      actor_uid: actor_uid,
      acceptor_uid: acceptor_uid,
      request_type: request_type,
    }),
  })
  .then(response => {
    if (!response.ok) {
      // This throws an Error which will be caught by the catch block below
      throw new Error(`Server responded with an error: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log('Follows data synced:', data))
  .catch(error => { console.log('Error syncing follows data:', error.message);
                    console.log(actor_uid, acceptor_uid, request_type);
                    // setTimeout(() => changeRelation(actor_uid, acceptor_uid, request_type), 3000); // Retry after 3 seconds
  });
};
