import Order from '../models/order.js';
import OrderPay from '../models/orderPay.js';
import User from '../models/users.js';
import myKey from '../config/env.js';
import { emitOrder } from '../services/socket.io.js';

// Post Method
export const postPaymentType = async (req, res) => {
	try {
		const order = await Order.findOne({ user_id: req.user._id });
		if (order) {
			// ofline payment
			if (req.body.type === 'cash') {
				const cashPay = new OrderPay({
					foods: order.foods,
					amount: order.amount * 100,
					orderId: order.orderId,
					location: req.body.location,
					user_id: order.user_id,
					userInfo: {
						fullName: order.user.fullName,
						phoneNumber: order.user.phoneNumber,
					},
					active: true,
					description: req.body.description,
				});
				await cashPay.save();
				const olldOrder = await Order.find();
				const filterOrder = olldOrder.filter(order => order.active !== false);
				emitOrder('new_order', filterOrder);
				//User oldd order deleted
				await Order.findByIdAndDelete(order._id);
				return res
					.status(200)
					.json({ message: 'successfully send to cash order', data: true });
			}
			// online payment
			if (req.body.type === 'online') {
				const onlinePay = new OrderPay({
					foods: order.foods,
					amount: order.amount * 100,
					orderId: order.orderId,
					location: req.body.location,
					user_id: order.user_id,
					userInfo: {
						fullName: order.user.fullName,
						phoneNumber: order.user.phoneNumber,
					},
					type: req.body.type,
					description: req.body.description,
				});
				await onlinePay.save();
				//User oldd order deleted
				await Order.findByIdAndDelete(order._id);
				const user = await User.findById(req.user._id);
				// Send payme data for payment
				return res.status(200).json({
					message: 'Data to be sent to PAYME',
					data: {
						amount: onlinePay.amount,
						user_id: user.userId,
						order_id: onlinePay.orderId,
						merId: myKey.PAYME_MERCHANT_ID,
					},
				});
			}
		}
		return res.status(401).json({ message: 'Order not found', data: false });
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: false,
		});
		return;
	}
};
