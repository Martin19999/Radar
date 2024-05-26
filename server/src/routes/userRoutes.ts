import { Router } from 'express';
import { syncUserData } from '../controllers/userController';

const router = Router();

router.post('/sync-user', syncUserData);

export default router;
