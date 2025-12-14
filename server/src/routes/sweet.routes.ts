import {Router} from 'express';
import { createSweet, getSweets } from '../controllers/sweet.controller'; 
import { authMiddleware } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';

const router = Router();

router.get('/',authMiddleware, getSweets);
router.post('/',authMiddleware,adminMiddleware, createSweet);

export default router;  