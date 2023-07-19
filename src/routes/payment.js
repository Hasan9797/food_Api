import { Router } from 'express';

import payme from '../controllers/transaction.controller.js';

import { paymeCheckToken } from '../middlewares/transaction.middleware.js';

const router = Router();

router.post('/', payme);

export default router;
