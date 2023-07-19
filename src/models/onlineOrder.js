import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
	{
		foods: [],
		userName: { type: String, required: true },
		user_id: { type: String, required: true },
		amount: { type: Number, required: true },
		orderId: { type: String, default: 'soskcsc' },
		location: { type: String, required: true, default: '2222.222.22.2222.222' },
		type: { type: String, required: true, default: 'Online' },
		status: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export default model('Online', orderSchema);
