import Discount from '../models/discount.js';

export const getDiscount = async (req, res) => {
	try {
		const discount = await Discount.findOne();
		if (!discount) {
			return res.status(500).json({ message: 'not found', data: false });
		}
		return res
			.status(200)
			.json({ message: 'successfully get are discount', data: discount });
	} catch (error) {
		res.status(500).json(error.message);
		return;
	}
};

export const addDiscount = async (req, res) => {
	try {
		const discount = await Discount.findOne();
		console.log(discount);
		if (!discount) {
			const neword = new Discount({
				percentage: req.body.percentage,
				amount: req.body.amount,
			});
			await neword.save();
			return res
				.status(200)
				.json({ message: 'successfully Created', data: discount });
		}
		const newDiscount = await Discount.findByIdAndUpdate(
			{ _id: discount._id },
			{
				$set: {
					percentage: req.body.percentage,
					amount: req.body.amount,
				},
			},
			{ new: true }
		);
		if (!newDiscount) {
			return res.status(500).json({
				message: 'Order not found',
				data: false,
			});
		}
		return res
			.status(200)
			.json({ message: 'Successfully updated', data: newDiscount });
	} catch (err) {
		return res.status(500).json({
			message: err.message,
			data: false,
		});
	}
};

// Delete Method
export const deletedDiscount = async (req, res) => {
	try {
		await Discount.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					percentage: 0,
					amount: 0,
				},
			}
		);
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
