
/**
 * Send a comment to the back-end.
 * @param comment - comment 
 */
export const makeComments = async(comment: string, uid: string, post_id: string): Promise<void> => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/submit-comment`;  // Adjust!!!

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uid: uid,
      content: {
        type: "text",
        content: comment
      },
      post_id: post_id
    }),
  })
  .then(response => {
    if (!response.ok) {
      // This throws an Error which will be caught by the catch block below
      throw new Error(`Server responded with an error: ${response.status}`);
    }
    return response.json();
  })
  .catch(error => { console.log('Error with posting this comment:', error.message);
                    // setTimeout(() => makePosts(post, uid), 3000); // Retry after 3 seconds
  });

};