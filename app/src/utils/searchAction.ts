// src/utils/searchAction.ts
import { SearchRequest, UserInfo } from '../types';  // Assuming you define your types somewhere

/**
 * perform search request
 * @param req - type + input query
 */
export const search = <T>(req: SearchRequest): Promise<T[]> => {
  const url = new URL(`${process.env.REACT_APP_BACKEND_URL}/api/search`);  // Adjust as necessary
  url.searchParams.append('searchType', req.searchType);
  url.searchParams.append('inputQuery', req.inputQuery);
  // const orgin = 

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      // 'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Server responded with an error: ${response.status}`);
    }
    // console.log(response.json());
    return response.json() as Promise<T[]>;
  })
  // .then(data => console.log('Search result:', data))
  .catch(error => { return Promise.reject(error.message);
                    // setTimeout(() => search(req), 3000); // Retry after 3 seconds
  });
};
