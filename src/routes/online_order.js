import { Router } from 'express';
const router = Router();
import { verify } from '../middlewares/verfiy.js';
import {
	getOnlineOrder,
	getByIdOnlineOrder,
	deletedOnlineOrder,
} from '../controllers/onlineOrder.js';

router.get('/', verify, getOnlineOrder);
router.get('/:id', verify, getByIdOnlineOrder);
router.delete('/delete/:id', verify, deletedOnlineOrder);

export default router;
