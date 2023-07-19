import multer from 'multer';

// const storage = multer.diskStorage({
// 	destination(req, file, cb) {
// 		cb(null, 'uploads');
// 	},
// 	filename(req, file, cb) {
// 		cb(
// 			null,
// 			new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
// 		);
// 	},
// });

// const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

// const fileFilter = (req, file, cb) => {
// 	if (allowedTypes.includes(file.mimetype)) {
// 		cb(null, true);
// 	} else {
// 		cb(null, false);
// 	}
// };

// export default multer({
// 	storage,
// 	fileFilter,
// });

export const upload = multer({ dest: 'uploads/' });
