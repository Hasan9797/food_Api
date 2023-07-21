import { Router } from 'express';
import Order from '../models/order.js';
import OrderPay from '../models/orderPay.js';
import User from '../models/users.js';
import myKey from '../config/env.js';

import { postPaymentType } from '../controllers/paymentType.js';
import { verify } from '../middlewares/verfiy.js';

const router = Router();
function soketPaymentType(io) {
	router.post('/', verify, async (req, res) => {
		try {
			const order = await Order.findOne({ user_id: req.user._id });
			if (order) {
				if (req.body.type === 'cash') {
					const cashPay = new OrderPay({
						foods: order.foods,
						amount: order.amount * 100,
						orderId: order.orderId,
						location: req.body.location,
						user_id: order.user_id,
						userName: order.userName,
						description: req.body.description,
						status: true,
					});
					await cashPay.save();
					io.on('connection', socket => {
						console.log('SocketIo Connected');
						socket.emit('new_order', cashPay);
					});
					await Order.findByIdAndDelete(order._id);
					return res
						.status(200)
						.json({ message: 'successfully send to cash order', data: true });
				}
				if (req.body.type === 'online') {
					const onlinePay = new OrderPay({
						foods: order.foods,
						amount: order.amount * 100,
						orderId: order.orderId,
						location: req.body.location,
						user_id: order.user_id,
						userName: order.userName,
						type: req.body.type,
						description: req.body.description,
					});
					await onlinePay.save();
					io.on('connection', socket => {
						console.log('SocketIo Connected');
						socket.emit('new_order', onlinePay);
					});
					await Order.findByIdAndDelete(order._id);
					const user = await User.findById(req.user._id);
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
	});
	return router;
}

export default soketPaymentType;
