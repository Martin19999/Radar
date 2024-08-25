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
        
      case 'posts-all': 
        const searchQuery21 = ` SELECT p.uid, p.title, p.content, u.display_name, u.photo_url, p.created_at, p.post_id
                            FROM posts AS p JOIN users AS u
                            ON p.uid = u.uid
                            WHERE p.is_available = true
                            ORDER BY p.created_at DESC;`;
        const searchResult21 = await query(searchQuery21, []);
        res.json(searchResult21.rows);
        break;
      case 'posts-by-user':
        const searchQuery22 = ` SELECT p.uid, p.title, p.content, u.display_name, u.photo_url, p.created_at, p.post_id
                            FROM posts AS p JOIN users AS u
                            ON p.uid = u.uid
                            WHERE p.is_available = true AND p.uid = $1
                            ORDER BY p.created_at DESC;`;
        const searchResult22 = await query(searchQuery22, [inputQuery]);
        res.json(searchResult22.rows);
        break;
      case 'posts-by-id':
        const searchQuery23 = ` SELECT p.uid, p.title, p.content, u.display_name, u.photo_url, p.created_at, p.post_id
                            FROM posts AS p JOIN users AS u
                            ON p.uid = u.uid
                            WHERE p.is_available = true AND p.post_id = $1`;      
        const searchResult23 = await query(searchQuery23, [inputQuery]);
        res.json(searchResult23.rows);
        break;
      case 'posts-by-keyword':
        const searchQuery24 = `
                              SELECT p.post_id, p.title, p.content, p.created_at, u.display_name, u.uid, u.photo_url,     
                                  ts_rank_cd(
                                      setweight(to_tsvector('english', p.title), 'A') || 
                                      setweight(to_tsvector('english', p.content->>'content'), 'C'),
                                      to_tsquery($1)
                                  ) AS rank
                                FROM posts p JOIN users u 
                                ON p.uid = u.uid 
                                WHERE 
                                    p.is_available = true AND
                                    (to_tsvector('english', p.title) @@ to_tsquery($1) 
                                    OR
                                    to_tsvector('english', p.content->>'content') @@ to_tsquery($1))
                                ORDER BY 
                                    rank DESC
                              `;
        const searchResult24 = await query(searchQuery24, [inputQuery]);
        res.json(searchResult24.rows);
        break;
      case 'posts-quantity-by-user':
        const searchQuery25 = ` SELECT COUNT(posts.post_id)
                            FROM posts
                            WHERE posts.is_available = true AND posts.uid = $1
                            `;
        const searchResult25 = await query(searchQuery25, [inputQuery]);
        res.json(searchResult25.rows);
        break;
      
      case 'comments-by-post':
        const searchQuery31 = ` SELECT u.display_name, u.photo_url, u.uid, c.content, c.created_at
                            FROM comments AS c JOIN users AS u
                            ON c.uid = u.uid
                            WHERE c.is_available = true AND c.post_id = $1 AND c.parent_comment_id IS NULL
                            ORDER BY c.created_at`;      
        const searchResult31 = await query(searchQuery31, [inputQuery]);
        res.json(searchResult31.rows);
        break;
      case 'comments-by-keyword':
        const searchQuery32 = `
                              SELECT c.comment_id, c.content, c.created_at, c.post_id, u.display_name, u.uid, u.photo_url     
                              FROM comments c JOIN users u 
                              ON c.uid = u.uid 
                              WHERE c.is_available = true AND to_tsvector('english', c.content->>'content') @@ to_tsquery($1)
                              `;
        const searchResult32 = await query(searchQuery32, [inputQuery]);
        res.json(searchResult32.rows);
        break;
      default:
        return res.status(400).send('Invalid search type');
    }
    // res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
}



                              