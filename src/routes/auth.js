import Router from 'express';
const router = Router();
import {
	Register,
	Login,
	getByIdUser,
	refreshToken,
	updateUser,
} from '../controllers/auth.js';
import { verify } from '../middlewares/verfiy.js';
router.post('/login', Login);
router.post('/regester', Register);
router.put('/update/:id', updateUser);
router.get('/my', verify, getByIdUser);
router.delete('/delete/:id');
router.get('/refToken', refreshToken);

export default router;
