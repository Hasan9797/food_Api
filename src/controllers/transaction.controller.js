import transactionService from '../services/transaction.service.js';

import { PaymeMethod } from '../enums/transaction.enum.js';

async function payme(req, res, next) {
	try {
		const { method, params, id } = req.body;

		switch (method) {
			case PaymeMethod.CheckPerformTransaction: {
				const data = await transactionService.checkPerformTransaction(
					params,
					id
				);
				return res.json(data);
			}
			case PaymeMethod.CheckTransaction: {
				const result = await transactionService.checkTransaction(params, id);

				return res.json({ result, id });
			}
			case PaymeMethod.CreateTransaction: {
				const result = await transactionService.createTransaction(params, id);

				return res.json({ result, id });
			}
			case PaymeMethod.PerformTransaction: {
				const result = await transactionService.performTransaction(params, id);

				return res.json({ result, id });
			}
			case PaymeMethod.CancelTransaction: {
				const result = await transactionService.cancelTransaction(params, id);

				return res.json({ result, id });
			}
			case PaymeMethod.GetStatement: {
				const result = await transactionService.getStatement(params);

				return res.json({ result });
			}
		}
	} catch (err) {
		next(err);
	}
}

export default payme;
