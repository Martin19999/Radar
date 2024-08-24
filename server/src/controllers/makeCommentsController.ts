import { Request, Response } from 'express';
import { query } from '../utils/db';
import { Posts } from '../types/posts';

export const makeComments = async (req: Request, res: Response) => {
  const { post_id, content, uid }  = req.body;
  try {
    // assume user exists

    const insertQuery = 'INSERT INTO comments (post_id, uid, content) VALUES ($1, $2, $3)';
    await query(insertQuery, [post_id, uid, content]);
    console.log('New post is made.');
    
    res.json({ message: 'Post made successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error occurred while making a post.' });
  }
};