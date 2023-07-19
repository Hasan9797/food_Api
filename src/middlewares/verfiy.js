import jwt from 'jsonwebtoken';
import { NoAuthorization } from '../enums/transaction.enum.js';

import TransactionError from '../errors/transaction.error.js';

export const verify = (req, res, next) => {
	try {
		const token = req.headers.authorization;
		if (token) {
			jwt.verify(token, process.env.JWT_SEC, (err, user) => {
				if (err) throw new TransactionError(NoAuthorization);
				req.user = user;
				next();
			});
		} else {
			throw new TransactionError(NoAuthorization);
		}
	} catch (err) {
		next(err);
	}
};

export const verifyTokenAndAuthorization = (req, res, next) => {
	verify(req, res, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next();
		} else {
			res.status(403).json('You are not alowed to do that!');
		}
	});
};

export const verifyTokenAndAdmin = (req, res, next) => {
	verify(req, res, () => {
		if (req.user.isAdmin) {
			next();
		} else {
			res.status(403).json('You are not alowed to do that!');
		}
	});
};
