import { Request, Response } from 'express';
import { query } from '../utils/db';
import { SearchQuery } from '../types/searchQuery';

export const showUserInfo = async (req: Request, res: Response) => {
  const uid = req.query.uid as String;
  try {
      const searchQuery = ` SELECT uid, photo_url, display_name, created_at
                            FROM users
                            WHERE uid = $1 
                            AND is_active = true;`;
      const searchResult = await query(searchQuery, [uid]);
      res.json(searchResult.rows);
    // res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
}