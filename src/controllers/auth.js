import User from '../models/users.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { NoAuthorization } from '../enums/transaction.enum.js';

import TransactionError from '../errors/transaction.error.js';

function sendSmsByEmail(userEmail) {
	let result = 0;
	const characters = '012345678976823940129386746382749127412345678911023';
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < 5) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'hasanjonsadullayev97@gmail.com',
			pass: 'ejlndgtvmylkyetn',
		},
	});

	let mailOptions = {
		from: 'hasanjonsadullayev97@gmail.com',
		to: userEmail,
		subject: 'Email With Attachments',
		html: `<h1>Quyidagi parolni Dilhush Fayz mobile ilovasiga kirting: ${result}</h1>`,
	};

	return { transporter, mailOptions, result };
}

export const verifyEmail = async (req, res) => {
	try {
		const { transporter, mailOptions, result } = sendSmsByEmail(req.body.email);
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				throw error;
			} else {
				console.log('Email Sent Successfully to ' + mailOptions.to);
			}
		});
		return res
			.status(200)
			.json({ message: 'successfully send to email', data: result });
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};

export const Register = async (req, res) => {
	try {
		const { fullName, phoneNumber, email, password, isAdmin } = req.body;
		const currentUser = await User.findOne({
			email,
		});
		if (!currentUser) {
			const hashPass = await bcrypt.hash(password, 10);
			const user = new User({
				fullName,
				phoneNumber,
				email,
				password: hashPass,
				userId: v4(),
				isAdmin,
			});
			const newuser = await user.save();
			return res
				.status(200)
				.json({ message: 'User addet Sucsessfuly', data: true });
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

export const deletedUser = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		return res
			.status(200)
			.json({ message: 'successfully deleted', data: true });
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: false,
		});
		return;
	}
};

export const updatePassword = async (req, res) => {
	try {
		const { email, password } = req.body;
		const currentUser = await User.findOne({
			email,
		});
		if (currentUser) {
			const hashPass = await bcrypt.hash(password, 10);
			const newUser = await User.findByIdAndUpdate(
				{ _id: currentUser._id },
				{
					$set: {
						password: hashPass,
					},
				},
				{ new: true, useFindAndModify: false }
			);
			if (!newUser) {
				return res.status(403).json({
					message: 'Is not a User',
					data: false,
				});
			}
			res.status(200).json({ message: 'Successfully updated', data: newUser });
		}
		return res.status(403).json({ message: 'Is not a User', data: false });
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};
