import { Schema, model } from 'mongoose';

const discountSchema = new Schema(
	{
		percentage: { type: Number, required: true },
		amount: { type: Number, required: true },
	},
	{ timestamps: true }
);

export default model('Discount', discountSchema);
