import mongoose from 'mongoose';

export const connectDB = async () => {
	try {
		mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
		});
		console.log('MongoDB connected...');
	} catch (err) {
		console.log(err.message);
	}
};
