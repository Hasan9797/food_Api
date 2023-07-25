import Order from '../models/order.js';
import User from '../models/users.js';
import { v4 } from 'uuid';

export const getOrder = async (req, res) => {
	try {
		const order = await Order.findOne({
			user_id: req.user._id,
		});
		if (!order) {
			return res.status(500).json({ message: 'Order is impty', data: [] });
		}
		return res.status(200).json({
			message: 'successfully get All is data',
			data: [{ _id: order._id, foods: order.foods, amount: order.amount }],
		});
	} catch (e) {
		return res.status(500).json({
			message: 'Order is impty',
			data: false,
		});
	}
};

export const addOrder = async (req, res) => {
	try {
		const order = await Order.findOne({ user_id: req.user._id });
		const currentUser = await User.findById(req.user._id);
		if (!order) {
			const neword = new Order({
				foods: [req.body],
				user_id: currentUser._id,
				user: {
					fullName: currentUser.fullName,
					phoneNumber: currentUser.phoneNumber,
				},
				amount: req.body.price,
				orderId: v4(),
			});
			await neword.save();
			return res
				.status(200)
				.json({ message: 'successfully Created', data: neword });
		}
		const newOrder = await Order.findByIdAndUpdate(
			{ _id: order._id },
			{
				$push: {
					foods: req.body,
				},
				$inc: { amount: req.body.price },
			},
			{ new: true }
		);
		if (!newOrder) {
			return res.status(500).json({
				message: 'Order not found',
				data: false,
			});
		}
		return res
			.status(200)
			.json({ message: 'Successfully updated', data: newOrder });
	} catch (err) {
		return res.status(500).json({
			message: err.message,
			data: false,
		});
	}
};

export const deleteOrder = async (req, res, next) => {
	try {
		await Order.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'Order deleted successfully' });
	} catch (err) {
		next(err);
	}
};
