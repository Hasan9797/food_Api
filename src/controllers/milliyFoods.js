import NotionalFoods from '../models/national_foods.js';

// Get Method
export const getNationalFood = async (req, res) => {
	try {
		const nationalFood = await NotionalFoods.find();
		if (!nationalFood) {
			return res.status(500).json({ message: 'not found', data: false });
		}
		res.status(200).json({
			message: 'successfully get is nationalFood',
			data: nationalFood,
		});
	} catch (error) {
		res.status(500).json(error.message);
		return;
	}
};

// Get Method By Id
export const getByIdNationalFood = async (req, res) => {
	try {
		const food = await NotionalFoods.findById(req.params.id);
		if (!food) {
			return res.status(500).json({ message: 'not found', data: false });
		}
		res.status(200).json({ message: 'successfully get are food', data: food });
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: false,
		});
		return;
	}
};

// Post Method
export const postNotionalFood = async (req, res) => {
	try {
		const food = await NotionalFoods(req.body);
		const newFood = await food.save();
		res.status(200).json({ message: 'successfully updatedAt', data: newFood });
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: false,
		});
		return;
	}
};

// Put Method
export const updateNationalFood = async (req, res) => {
	try {
		const newFood = await NotionalFoods.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					...req.body,
				},
			},
			{ new: true, useFindAndModify: false }
		);
		if (!newFood) {
			return res.status(500).json({
				message: 'The change failed',
				data: false,
			});
		}
		res.status(200).json({ message: 'Successfully updated', data: newFood });
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: false,
		});
		return;
	}
};

// Delete Method
export const deletedNationalFood = async (req, res) => {
	try {
		await NotionalFoods.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'successfully deleted', data: true });
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: false,
		});
		return;
	}
};
