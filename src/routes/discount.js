import Router from 'express';
const router = Router();
import {
	getDiscount,
	addDiscount,
	deletedDiscount,
} from '../controllers/discount.js';

import { verify } from '../middlewares/verfiy.js';

router.post('/', verify, getDiscount);
router.get('/', addDiscount);
router.delete('/delete/:id', verify, deletedDiscount);

export default router;
