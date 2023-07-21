import User from '../models/users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { NoAuthorization } from '../enums/transaction.enum.js';

import TransactionError from '../errors/transaction.error.js';

export const Register = async (req, res) => {
	try {
		const { fullName, phoneNumber, password, isAdmin } = req.body;
		const currentUser = await User.findOne({
			phoneNumber,
		});
		if (!currentUser) {
			const hashPass = await bcrypt.hash(password, 10);
			const user = new User({
				fullName,
				phoneNumber,
				password: hashPass,
				userId: v4(),
				isAdmin,
			});
			const newuser = await user.save();
			return res
				.status(200)
				.json({ message: 'User addet Sucsessfuly', data: newuser });
		} else {
			return res.json({
				message: 'This User is olready exist',
				data: false,
			});
		}
	} catch (error) {
		res.status(401).json({ error: error.message });
		return;
	}
};

export const Login = async (req, res) => {
	try {
		const user = await User.findOne({
			phoneNumber: req.body.phoneNumber,
		});

		if (!user)
			return res
				.status(401)
				.json({ message: 'Wrong email or password', data: false });
		const bcPast = await bcrypt.compare(req.body.password, user.password);
		if (!bcPast) {
			return res.status(401).json({ message: 'Wrong password', data: false });
		}

		const accessToken = jwt.sign(
			{
				_id: user._id,
				password: user.password,
			},
			process.env.JWT_SEC,
			{ expiresIn: '6d' }
		);
		res.status(200).json({ accessToken });
	} catch (err) {
		return res.json({
			message: err.message,
			data: false,
		});
	}
};

export const refreshToken = async (req, res) => {
	try {
		const token = req.headers.authorization;
		if (token) {
			jwt.verify(token, process.env.JWT_SEC, (err, user) => {
				if (err) throw new TransactionError(NoAuthorization);
				req.user = user;
			});
		}
		const refToken = jwt.sign(
			{
				_id: req.user._id,
				password: req.user.password,
				isAdmin: req.user?.isAdmin,
			},
			process.env.JWT_SEC,
			{ expiresIn: '6d' }
		);
		res.status(200).json({ refreshToken: refToken });
	} catch (err) {
		return res.status(500).json(err);
	}
};

// Put Method
export const updateUser = async (req, res) => {
	try {
		const newUser = await User.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					...req.body,
				},
			},
			{ new: true, useFindAndModify: false }
		);
		if (!newUser)
			return res.status(500).json({
				message: 'Is not a User',
				data: false,
			});
		res.status(200).json({ message: 'Successfully updated', data: newUser });
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};

export const getByIdUser = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		if (!user)
			return res.status(500).json({ message: 'not found', data: false });
		res.status(200).json({ message: 'successfully get are user', data: user });
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: false,
		});
		return;
	}
};
