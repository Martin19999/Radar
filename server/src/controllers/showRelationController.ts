import { Request, Response } from 'express';
import { query } from '../utils/db';
import { SearchQuery } from '../types/searchQuery';

export const showRelation = async (req: Request, res: Response) => {
  const uid = req.query.uid as string;
  const other_uid = req.query.other_uid as string;
  const request_type = req.query.request_type as string;
  try {
    switch(request_type) {
      case 'find-following':
        const searchQuery = ` SELECT u.uid, u.display_name, u.photo_url, u.created_at
                            FROM follows f JOIN users u
                            ON f.followed_id = u.uid
                            WHERE f.follower_id = $1 
                            AND f.is_active = true;`;
        const searchResult = await query(searchQuery, [uid]);
        res.json(searchResult.rows);
        break;
      case 'find-followers':
        const searchQuery2 = ` SELECT u.uid, u.display_name, u.photo_url, u.created_at
                                FROM follows f JOIN users u
                                ON f.follower_id = u.uid
                                WHERE f.followed_id = $1 
                                AND f.is_active = true;`;
        const searchResult2 = await query(searchQuery2, [uid]);
        res.json(searchResult2.rows);
        break;
      case 'find-num-following':
        const searchQuery3 = ` SELECT COUNT(followed_id)
                            FROM follows
                            WHERE follower_id = $1 
                            AND is_active = true;`;
        const searchResult3 = await query(searchQuery3, [uid]);
        const count3 = parseInt(searchResult3.rows[0].count, 10);
        res.json({count3});
        break;
      case 'find-num-followers':
        const searchQuery4 = ` SELECT COUNT(follower_id)
                            FROM follows
                            WHERE followed_id = $1 
                            AND is_active = true;`;
        const searchResult4 = await query(searchQuery4, [uid]);
        const count4 = parseInt(searchResult4.rows[0].count, 10);
        res.json({count4});
        break;
      case 'find-if-following':
        const searchQuery5 = `SELECT EXISTS (
                                SELECT 1 
                                FROM follows 
                                WHERE follower_id = $1 AND followed_id = $2 AND is_active = true
                              );`;
        const searchResult5 = await query(searchQuery5, [uid, other_uid]);
        const boolean5 = searchResult5.rows[0].exists;
        res.json({ boolean5 });
        break;
      case 'find-if-being-followed':
        const searchQuery6 = `SELECT EXISTS (
                                SELECT 1 
                                FROM follows 
                                WHERE follower_id = $2 AND followed_id = $1 AND is_active = true
                              );`;
        const searchResult6 = await query(searchQuery6, [uid, other_uid]);
        const boolean6 = searchResult6.rows[0].exists;
        res.json({ boolean6 });
        break;
      default:
        return res.status(400).send('Invalid search type');
      
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
}