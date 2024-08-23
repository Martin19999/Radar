import { Request, Response } from 'express';
import { query } from '../utils/db';
import { Posts } from '../types/posts';

export const makePosts = async (req: Request, res: Response) => {
  const { title, content, uid }  = req.body;
  try {
    // assume user exists

    const insertQuery = 'INSERT INTO posts (uid, title, content) VALUES ($1, $2, $3)';
    await query(insertQuery, [uid, title, content]);
    console.log('New post is made.');
    
    res.json({ message: 'Post made successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error occurred while making a post.' });
  }
};
