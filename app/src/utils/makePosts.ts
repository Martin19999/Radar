import { Posts } from "../types/posts";

/**
 * Send a post's title and content to the back-end.
 * @param posts - including title and content.
 */
export const makePosts = async(post: Posts, uid: string): Promise<void> => {
  const url = 'http://localhost:3001/api/submit-post';  // Adjust!!!

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: post.title,
      content: {
        type: "text",
        content: post.content
      },
      uid: uid
    }),
  })
  .then(response => {
    if (!response.ok) {
      // This throws an Error which will be caught by the catch block below
      throw new Error(`Server responded with an error: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log('Posted!!:', data))
  .catch(error => { console.log('Error with posting:', error.message);
                    // setTimeout(() => makePosts(post, uid), 3000); // Retry after 3 seconds
  });

};