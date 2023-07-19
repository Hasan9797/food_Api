import userModel from '../models/users.js';

class UserRepo {
	constructor(model) {
		this.model = model;
	}

	async getById(userId) {
		return this.model.findOne({ userId: userId });
	}
}

export default new UserRepo(userModel);
