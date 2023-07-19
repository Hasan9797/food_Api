import BaseError from './base.error.js';

class TransactionError extends BaseError {
	constructor(transactionError, id, data) {
		super(transactionError.name);

		this.transactionErrorCode = transactionError.code;
		this.transactionErrorMessage = transactionError.message;
		this.transactionData = data;
		this.transactionId = id;
		this.isTransactionError = true;
	}
}

export default TransactionError;
