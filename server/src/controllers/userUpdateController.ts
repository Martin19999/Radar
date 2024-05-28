import { Request, Response } from 'express';
import { query } from '../utils/db';
import { UserData } from '../types/userData';

export const syncUserData = async (req: Request, res: Response) => {
  const { uid, displayName, photoURL, isActive }:UserData  = req.body;
  try {
    const existResult = await query('SELECT 1 FROM users WHERE uid = $1', [uid]);

    if (existResult.rowCount === 0) {
      const insertQuery = 'INSERT INTO users (uid, display_name, photo_url, is_active) VALUES ($1, $2, $3, $4)';
      await query(insertQuery, [uid, displayName, photoURL, isActive]);
      console.log('New user inserted.');
    } else {
      const selectResult = await query('SELECT display_name, photo_url, is_active FROM users WHERE uid = $1', [uid]);
      const { display_name, photo_url, is_active } = selectResult.rows[0];
      if (display_name !== displayName || photo_url !== photoURL || is_active !== isActive) {
        await query('UPDATE users SET display_name = $1, photo_url = $2, is_active = $3 WHERE uid = $4', [displayName, photoURL, isActive, uid]);
        console.log('User data updated');
      }
    }
    res.json({ message: 'User data synced successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error occurred while syncing user data.' });
  }
};
