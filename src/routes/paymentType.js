import { Router } from 'express';
import { postPaymentType } from '../controllers/paymentType.js';
import { verify } from '../middlewares/verfiy.js';

const router = Router();
router.post('/', verify, postPaymentType);

export default router;
