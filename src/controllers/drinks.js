import Drinks from '../models/drinks.js';
// Get Method
export const getDrinks = async (req, res) => {
	try {
		const drinks = await Drinks.find();
		if (!drinks) {
			return res.status(500).json({ message: 'not found', data: false });
		}
		res
			.status(200)
			.json({ message: 'successfully get are drinks', data: drinks });
	} catch (error) {
		res.status(500).json(error.message);
		return;
	}
};

// Get Method By Id
export const getByIdDrink = async (req, res) => {
	try {
		const drink = await Drinks.findById(req.params.id);
		if (!drink) {
			return res.status(500).json({ message: 'not found', data: false });
		}
		res
			.status(200)
			.json({ message: 'successfully get are drink', data: drink });
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: false,
		});
		return;
	}
};

// Post Method
export const postDrink = async (req, res) => {
	try {
		const drink = await Drinks(req.body);
		const newDrink = await drink.save();
		res.status(200).json({ message: 'successfully updatedAt', data: newDrink });
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: false,
		});
		return;
	}
};

// Put Method
export const updateDrink = async (req, res) => {
	try {
		const newDrink = await Drinks.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					...req.body,
				},
			},
			{ new: true, useFindAndModify: false }
		);
		if (!newDrink) {
			return res.status(500).json({
				message: 'The change failed',
				data: false,
			});
		}
		res.status(200).json({ message: 'Successfully updated', data: newDrink });
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: false,
		});
		return;
	}
};

// Delete Method
export const deletedDrink = async (req, res) => {
	try {
		await Drinks.findByIdAndDelete(req.params.id);
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

export const filterDrink = async (req, res) => {
	try {
		const data = await Drinks.find();
		res.status(200).json({ message: 'successfully deleted', data: true });
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: false,
		});
		return;
	}
};
