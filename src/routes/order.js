import Router from 'express';
const router = Router();
import { verify } from '../middlewares/verfiy.js';
import { getOrder, addOrder, deleteOrder } from '../controllers/order.js';

router.post('/', verify, addOrder);
router.put('/update/:id');
router.get('/', verify, getOrder);
router.delete('/delete/:id', verify, deleteOrder);

export default router;
