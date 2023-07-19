import Cash from '../models/cashOrder.js';
import OnlineOrder from '../models/onlineOrder.js';
import User from '../models/users.js';

// Get Method
export const getCashOrder = async (req, res) => {
	try {
		const allArray = [];
		const cashOrder = await Cash.find();
		const onlineOrder = await OnlineOrder.find();
		if (cashOrder) {
			cashOrder.forEach(data => {
				allArray.push(data);
			});
		}
		if (onlineOrder) {
			onlineOrder.forEach(data => {
				allArray.push(data);
			});
		}
		if (!cashOrder && !onlineOrder) {
			return res.status(500).json({ message: 'not found', data: false });
		}

		res.status(200).json({
			message: 'successfully get is cashOrder',
			data: allArray,
		});
	} catch (error) {
		return res.json(error.message);
	}
};

// Get Method By Id
export const getByIdCashOrder = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(500).json({ message: 'User not found', data: false });
		}
		const allArray = [];
		const cashOrder = await Cash.find();
		const onlineOrder = await OnlineOrder.find();
		if (cashOrder) {
			cashOrder.forEach(data => {
				if (data.user_id === req.params.id) {
					allArray.push(data);
				}
			});
		}
		if (onlineOrder) {
			onlineOrder.forEach(data => {
				if (data.user_id === req.params.id) {
					allArray.push(data);
				}
			});
		}
		if (!cashOrder && !onlineOrder) {
			return res.status(500).json({ message: 'not found', data: false });
		}

		res
			.status(200)
			.json({ message: 'successfully get are cash', data: allArray });
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};

// Put Method
// export const updatePizza = async (req, res) => {
// 	try {
// 		const newPizza = await Cash.findByIdAndUpdate(
// 			{ _id: req.params.id },
// 			{
// 				$set: {
// 					img: req.file.filename,
// 					...req.body,
// 				},
// 			},
// 			{ new: true, useFindAndModify: false }
// 		);
// 		!newPizza &&
// 			res.status(500).json({
// 				message: 'Is not a group',
// 				data: false,
// 			});
// 		res.status(200).json({ message: 'Successfully updated', data: newPizza });
// 	} catch (error) {
// 		return res.status(500).json({
// 			message: error.message,
// 			data: false,
// 		});
// 	}
// };

// Delete Method
export const deletedCahOrder = async (req, res) => {
	try {
		await Cash.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'successfully deleted', data: true });
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};
