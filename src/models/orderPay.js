import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
	{
		foods: [],
		user_id: { type: String, required: true },
		userInfo: {
			fullName: { type: String, required: true },
			phoneNumber: { type: Number, required: true },
		},
		amount: { type: Number, required: true },
		orderId: { type: String, default: 'soskcsc' },
		location: { type: String, required: true, default: '2222.222.22.2222.222' },
		description: { type: String, required: true, default: 'anything' },
		type: { type: String, required: true, default: 'cash' },
		status: { type: Boolean, default: false },
		active: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export default model('OrderPay', orderSchema);
