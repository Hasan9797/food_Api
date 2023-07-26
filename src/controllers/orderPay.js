import OrderPay from '../models/orderPay.js';

// Get Method
export const getPayOrder = async (req, res) => {
	try {
		const orderPay = await OrderPay.find();
		if (orderPay) {
			const filteredOrder = orderPay.filter(order => order.active === true);
			return res.status(200).json({
				message: 'successfully get is cashOrder',
				data: filteredOrder,
			});
		}
		return res.status(500).json({ message: 'not found', data: false });
	} catch (error) {
		return res.json(error.message);
	}
};

// Get Method By Id From User
export const getByIdPayOrderFromUser = async (req, res) => {
	try {
		const orderPay = await OrderPay.find();
		if (!orderPay) {
			return res.status(500).json({ message: 'Order is empty', data: [] });
		}
		const allOrders = orderPay.filter(data => data.user_id === req.params.id);
		if (!allOrders) {
			return res
				.status(200)
				.json({ message: 'successfully get are orders', data: [] });
		}
		return res
			.status(200)
			.json({ message: 'successfully get are orders', data: allOrders });
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};

// Put Method
export const updateFromDeletePayOrder = async (req, res) => {
	try {
		const newPizza = await OrderPay.updateMany(
			{ _id: { $in: [...req.body.allId] } },
			{
				$set: {
					active: false,
				},
			},
			{ new: true }
		);
		if (!newPizza) {
			return res.status(500).json({
				message: 'Is not a group',
				data: false,
			});
		}
		res.status(200).json({ message: 'Successfully updated', data: newPizza });
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};

// Delete Method
export const deletedPayOrder = async (req, res) => {
	try {
		await OrderPay.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'successfully deleted', data: true });
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};
