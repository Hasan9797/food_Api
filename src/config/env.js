import { config } from 'dotenv';
config();

export default {
	PAYME_MERCHANT_KEY: process.env.PAYME_MERCHANT_KEY,
	PAYME_MERCHANT_ID: process.env.PAYME_MERCHANT_ID,
	BUKET_NAME: process.env.BUKET_NAME,
	AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
	AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
	S3_INDPOINT: process.env.S3_INDPOINT,
};
