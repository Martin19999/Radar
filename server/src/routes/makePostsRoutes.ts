import { Router } from 'express';
import { makePosts } from '../controllers/makePostsController';

const router = Router();

router.post('/submit-post', makePosts);

export default router;
