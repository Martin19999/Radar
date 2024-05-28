// src/utils/searchAction.ts
import { SearchRequest, UserInfo } from '../types';  // Assuming you define your types somewhere

/**
 * perform search request
 * @param req - type + input query
 */
export const search = (req: SearchRequest): Promise<UserInfo[]> => {
  const url = new URL('http://localhost:3001/api/search');  // Adjust as necessary
  url.searchParams.append('searchType', req.searchType);
  url.searchParams.append('inputQuery', req.inputQuery);

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Server responded with an error: ${response.status}`);
    }
    // console.log(response.json());
    return response.json();
  })
  // .then(data => console.log('Search result:', data))
  .catch(error => { return Promise.reject(error.message);
                    // setTimeout(() => search(req), 3000); // Retry after 3 seconds
  });
};
