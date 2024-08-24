import { Router } from 'express';
import { makeComments } from '../controllers/makeCommentsController';

const router = Router();

router.post('/submit-comment', makeComments);

export default router;