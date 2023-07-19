import OnlineOrder from '../models/onlineOrder.js';

// Get Method
export const getOnlineOrder = async (req, res) => {
	try {
		const online = await OnlineOrder.find();
		if (!online) {
			return res.status(500).json({ message: 'not found', data: false });
		}
		res.status(200).json({
			message: 'successfully get is Order',
			data: online,
		});
	} catch (error) {
		return res.json(error.message);
	}
};

// Get Method By Id
export const getByIdOnlineOrder = async (req, res) => {
	try {
		const onlineOrder = await OnlineOrder.find();
		if (!onlineOrder) {
			return res.status(500).json({ message: 'not found', data: false });
		}
		const onlineArray = onlineOrder.map(data => {
			if (data.user.user_id === req.params.id) {
				return data;
			}
		});
		res
			.status(200)
			.json({ message: 'successfully get are cash', data: onlineArray });
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};

// Delete Method
export const deletedOnlineOrder = async (req, res) => {
	try {
		await OnlineOrder.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'successfully deleted', data: true });
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};
