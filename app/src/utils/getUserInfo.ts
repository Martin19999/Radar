// src/utils/getUserInfo.ts
import { UserInfo } from '../types';  // Assuming you define your types somewhere

/**
 * display basic user info
 * @param req - uid
 */
export async function getUserInfo(userId: string): Promise<UserInfo[]> {
  const url = new URL(`${process.env.REACT_APP_BACKEND_URL}/api/userinfo`);
  url.searchParams.append('uid', userId);

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

