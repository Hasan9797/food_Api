import { Schema, model } from 'mongoose';

const usersSchema = new Schema(
	{
		fullName: { type: String, required: true },
		phoneNumber: { type: Number, unique: true, required: true },
		password: { type: String, required: true },
		isAdmin: { type: Boolean, required: true, default: false },
		userId: { type: String, required: true },
	},
	{ timestamps: true }
);

export default model('userModel', usersSchema);
