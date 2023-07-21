import Router from 'express';
const router = Router();
import {
	Register,
	Login,
	getByIdUser,
	refreshToken,
	updateUser,
	verifyEmail,
	deletedUser,
	updatePassword,
} from '../controllers/auth.js';
import { verify } from '../middlewares/verfiy.js';

router.post('/login', Login);  // http://localhost:3000/api/auth/login

router.post('/verify', verifyEmail); // http://localhost:3000/api/auth/verify

router.post('/regester', Register);  // http://localhost:3000/api/auth/regester

router.put('/update/:id', updateUser);  // http://localhost:3000/api/auth/updateUser

router.put('/forgudpass', updatePassword);  // http://localhost:3000/api/auth/forgudpass

router.get('/my', verify, getByIdUser);  // http://localhost:3000/api/auth/my

router.delete('/delete/:id', deletedUser);  // http://localhost:3000/api/auth/delete/ (user id)

router.get('/refToken', refreshToken);  // http://localhost:3000/api/auth/refToken

export default router;
