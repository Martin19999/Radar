import { Request, Response } from 'express';
import { query } from '../utils/db';

export const search = async (req: Request, res: Response) => {
  const searchType = req.query.searchType as String;
  const inputQuery = req.query.inputQuery as String;
  try {
    switch (searchType) {
      case 'users':
        const searchQuery = ` SELECT uid, photo_url, display_name, created_at
                              FROM users
                              WHERE display_name ILIKE '%' || $1 || '%'
                              AND is_active = true;`;
        const searchResult = await query(searchQuery, [inputQuery]);
        res.json(searchResult.rows);
        break;
      case 'posts':
          
        break;
      case 'comments':
          
        break;
      default:
        return res.status(400).send('Invalid search type');
    }
    // res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
}