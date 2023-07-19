import transactionModel from '../models/transaction.model.js';

class TransactionRepo {
	constructor(model) {
		this.model = model;
	}

	async create(data) {
		return await this.model.create(data);
	}

	async getOll() {
		return await this.model.find();
	}

	async getById(transactionId) {
		return await this.model.findOne({ id: transactionId });
	}

	async getByFilter(filter) {
		return await this.model.findOne(filter);
	}

	async updateById(transactionId, update) {
		const transaction = await this.getById(transactionId);
		return await this.model.findByIdAndUpdate(
			{ _id: transaction._id },
			{
				$set: {
					...update,
				},
			},
			{ new: true, useFindAndModify: false }
		);
	}
}

export default new TransactionRepo(transactionModel);
