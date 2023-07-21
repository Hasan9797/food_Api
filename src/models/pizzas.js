import { Schema, model } from 'mongoose';

const pizzasSchema = new Schema(
	{
		title: { type: String, required: true },
		amount: { type: String, required: true },
		img: { type: String, required: true },
		price: { type: Number, required: true },
		selection: { type: Boolean, default: true },
		code: { type: String, required: true, default: '00702001001000001' },
		vat_percent: { type: Number, required: true, default: 15 },
		package_code: { type: String, required: true, default: '123456' },
	},
	{ timestamps: true }
);

export default model('Pizza', pizzasSchema);
