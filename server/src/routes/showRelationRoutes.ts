import { Router } from 'express';
import { showRelation } from '../controllers/showRelationController';

const router = Router();

router.get('/show-relation', showRelation);

export default router;