import { Request, Response } from 'express';
import { query } from '../utils/db';
import { Posts } from '../types/posts';

export const makePosts = async (req: Request, res: Response) => {
  const { title, content, uid }  = req.body;
  try {
    // assume user exists

    const insertQuery = 'INSERT INTO posts (uid, title, content) VALUES ($1, $2, $3) RETURNING post_id;';
    const result = await query(insertQuery, [uid, title, content]);
    if (result.rows.length > 0) {
      const newPostId = result.rows[0].post_id;
      
      res.json({ message: 'Post made successfully', post_id: newPostId });
    } else {
      res.status(500).json({ error: 'Failed to create post' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error occurred while making a post.' });
  }
};


