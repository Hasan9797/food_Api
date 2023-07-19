// import AWS from 'aws-sdk';
// import { S3Client } from '@aws-sdk/client-s3';
// import multer from 'multer';
// import multerS3 from 'multer-s3';
// import path from 'path';

// // import myKey from '../config/env.js';
// const AWS_ACCESS_KEY_ID = 'DO006HG7X2ZKZTUPMZKR';
// const AWS_SECRET_ACCESS_KEY = 'EUTnfUr58FH4eHwwd9S4IccYMZn2WJJcPB6xsUc2bVk';
// const S3_INDPOINT = 'https://nyc3.digitaloceanspaces.com';
// const BUKET_NAME = 'digitaldramsbuket';

// const s3 = new S3Client({
// 	endpoint: new AWS.Endpoint(S3_INDPOINT),
// 	accessKeyId: AWS_ACCESS_KEY_ID,
// 	secretAccessKey: AWS_SECRET_ACCESS_KEY,
// });

// export const upload = multer({
// 	storage: multerS3({
// 		s3,
// 		acl: 'public-read',
// 		bucket: BUKET_NAME,
// 		contentType: multerS3.AUTO_CONTENT_TYPE,
// 		metadata: (req, file, cb) => {
// 			cb(null, { fieldname: file.fieldname });
// 		},
// 		key: (req, file, cb) => {
// 			console.log(file);
// 			const fileName = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
// 			cb(null, `${fileName}${path.extname(file.originalname)}`);
// 		},
// 	}),
// }).single('upload');

import path from 'path';
import fs from 'fs';

export const uploadFile = (req, res) => {
	const { file } = req?.files;

	if (!file) throw new Error('File not found');

	if (file?.size > 2 * 1024 * 1024) {
		throw new Error('Invalid size');
	}

	var fileName = Date?.now() + file?.name?.replace(/\s/g, '');
	const filePath = path?.join(process.cwd(), 'uploads', fileName);
	file?.mv(filePath);

	return res.json({ ok: true, filename: fileName });
};

export const removeFile = (req, res) => {
	const { filename } = req?.body;

	if (!filename) {
		throw new Error('Please provide a filename');
	}
	const filePath = path.join(process.cwd(), 'uploads', filename);

	fs.unlink(filePath, err => {
		if (err) {
			throw new Error('File not found');
		}
		return res.json({ ok: true, message: 'File removed successfully' });
	});
};
