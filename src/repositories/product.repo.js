import productModel from '../models/orderPay.js';

class ProductRepo {
	constructor(model) {
		this.model = model;
	}

	async getAll() {
		return this.model.find();
	}

	async getById(productId) {
		return this.model.findOne({ orderId: productId });
	}

	async getByUserId(id) {
		return await this.model.findOne({ userId: id });
	}

	async updateById(product_id, update) {
		const product = await this.getById(product_id);
		const newOrder = await this.model.findByIdAndUpdate(
			{ _id: product._id },
			{
				$set: {
					...update,
				},
			},
			{ new: true, useFindAndModify: false }
		);
	}
}

export default new ProductRepo(productModel);
