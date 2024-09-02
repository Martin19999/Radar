
/**
 * Send a comment to the back-end.
 * @param comment - comment 
 */
export const makeComments = async(comment: string, uid: string, post_id: string): Promise<void> => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/submit-comment`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: uid,
        content: {
          type: "text",
          content: comment,
        },
        post_id: post_id,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with an error: ${response.status}`);
    }
    const data = await response.json();
    
  } catch (error) {
    console.log('Error with posting this comment:', (error as Error).message);
  }
};
