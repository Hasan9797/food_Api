import { Router } from 'express';
const router = Router();
import {
	verify,
	verifyTokenAndAdmin,
	verifyTokenAndAuthorization,
} from '../middlewares/verfiy.js';
import {
	getCashOrder,
	getByIdCashOrder,
	deletedCahOrder,
} from '../controllers/cashOrder.js';

router.get('/order', verifyTokenAndAuthorization, getCashOrder);
router.get('/:id', verify, getByIdCashOrder);
router.delete('/delete/:id', verify, deletedCahOrder);

export default router;
