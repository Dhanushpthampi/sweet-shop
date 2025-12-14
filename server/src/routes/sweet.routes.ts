import {Router} from 'express';
import { createSweet, getSweets ,updateSweet } from '../controllers/sweet.controller'; 
import { authMiddleware } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';
import { deleteSweet } from '../controllers/sweet.controller';
const router = Router();

router.get('/',authMiddleware, getSweets);
router.post('/',authMiddleware,adminMiddleware, createSweet);
router.put('/:id',authMiddleware,adminMiddleware, updateSweet);
router.delete('/:id',authMiddleware,adminMiddleware,deleteSweet);

export default router;  