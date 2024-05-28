import { Router } from 'express';
import { syncUserData } from '../controllers/userUpdateController';

const router = Router();

router.post('/sync-user', syncUserData);

export default router;
