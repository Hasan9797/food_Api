import Router from 'express';
const router = Router();
import {
	getNationalFood,
	getByIdNationalFood,
	postNotionalFood,
	updateNationalFood,
	deletedNationalFood,
} from '../controllers/milliyFoods.js';
import { verify } from '../middlewares/verfiy.js';
router.get('/', getNationalFood);
router.get('/:id', getByIdNationalFood);
router.post('/', postNotionalFood);
router.put('/update/:id', updateNationalFood);
router.delete('/delete/:id', deletedNationalFood);

export default router;
