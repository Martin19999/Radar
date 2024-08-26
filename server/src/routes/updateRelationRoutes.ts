import { Router } from 'express';
import { updateRelation } from '../controllers/updateRelationController';

const router = Router();

router.post('/update-relation', updateRelation);

export default router;