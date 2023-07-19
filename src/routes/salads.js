import Router from 'express';
const router = Router();
import {
	getSalad,
	getByIdSalad,
	postSalad,
	updateSalad,
	deletedSalad,
} from '../controllers/salads.js';
import { verify } from '../middlewares/verfiy.js';
router.post('/', verify, postSalad);
router.put('/update/:id', verify, updateSalad);
router.get('/', getSalad);
router.get('/:id', verify, getByIdSalad);
router.delete('/delete/:id', verify, deletedSalad);

export default router;
