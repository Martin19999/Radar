import { Request, Response } from 'express';
import { query } from '../utils/db';
import { UserData } from '../types/userData';

export const updateRelation = async (req: Request, res: Response) => {
  const { actor_uid, acceptor_uid, request_type } = req.body
  try {
    console.log(request_type+"aaaaa");
    switch(request_type) {
      case 'follow':
        const insertQuery = `INSERT INTO follows (follower_id, followed_id) VALUES ($1, $2)`;
        await query(insertQuery, [actor_uid, acceptor_uid]);
        break;
      case 'unfollow':
        const insertQuery2 = `DELETE FROM follows 
                              WHERE follower_id = $1 AND followed_id = $2`;
        console.log(actor_uid, acceptor_uid);
        await query(insertQuery2, [actor_uid, acceptor_uid]);
        break;
      case 'deactivate':
        const insertQuery3 = `UPDATE follows 
                              SET is_active = false
                              WHERE follower_id = $1 OR followed_id = $1`;
        await query(insertQuery3, [actor_uid]);
        break;
      default:
        return res.status(400).send('Invalid search type');
    }

    
    res.json({ message: 'Relation updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error occurred while updating the relation.' });
  }
};
