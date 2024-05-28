import { Router } from 'express';
import { showUserInfo } from '../controllers/showUserInfoController';

const router = Router();

router.get('/userinfo', showUserInfo);

export default router;