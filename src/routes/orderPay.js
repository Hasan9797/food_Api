import { Router } from 'express';
const router = Router();
import {
	verify,
	verifyTokenAndAdmin,
	verifyTokenAndAuthorization,
} from '../middlewares/verfiy.js';
import {
	getPayOrder,
	getByIdPayOrderFromUser,
	deletedPayOrder,
	updateFromDeletePayOrder,
} from '../controllers/orderPay.js';

router.get('/', verifyTokenAndAuthorization, getPayOrder);
router.get('/:id', verify, getByIdPayOrderFromUser);
router.delete('/delete/:id', verify, deletedPayOrder);
router.put('/deletedany', verify, updateFromDeletePayOrder);

export default router;
