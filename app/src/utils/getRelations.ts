// src/utils/getRelations.ts
// import { UserInfo } from '../types';  // Assuming you define your types somewhere

/**
 * display the relation between users - all followers/ followings, number of followers/ followings, 
 *                                      if following / being followed
 * @param req - uid
 */
export async function getRelations<T>(uid: string, other_uid: string, request_type: string): Promise<T> {
  const url = new URL(`${process.env.REACT_APP_BACKEND_URL}/api/show-relation`);
  url.searchParams.append('uid', uid);
  url.searchParams.append('other_uid', other_uid);
  url.searchParams.append('request_type', request_type);

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Server responded with an error: ${response.status}`);
    }

    const data = await response.json(); // Assuming the response is JSON
    // console.log('Search result:', data[0]); // Optionally log the data
    return data; // Returning the parsed JSON data
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw error; // Rethrowing the error to be handled by the caller
  }
}

