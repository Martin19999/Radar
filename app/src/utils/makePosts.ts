import { Posts } from "../types/posts";

/**
 * Send a post's title and content to the back-end.
 * @param posts - including title and content.
 */

interface PostResponse {
  message: string;
  post_id: string;
}

export const makePosts = async (post: Posts, uid: string): Promise<string | null> => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/submit-post`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: post.title,
        content: {
          type: "text",
          content: post.content,
        },
        uid: uid,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with an error: ${response.status}`);
    }

    const data: PostResponse = await response.json(); // Cast response to PostResponse type

    return data.post_id; 
  } catch (error) {
    console.log('Error with posting:', (error as Error).message);
    return null; // Handle error case
  }
};
