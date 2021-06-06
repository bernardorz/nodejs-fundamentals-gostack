import { Router } from 'express';
import { ValidateParams } from '../middleware/validateParams';
import TransactionsRepository from '../repositories/TransactionsRepository'


interface Transactions{
  title : string;
  type: 'income' | 'outcome';
  value : number;

}

// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', async (request, response) => {
  try {
    const transactions = await transactionsRepository.all()
    return response.json(transactions)
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// transactionRouter.use(ValidateParams)

transactionRouter.post('/', ValidateParams , (request, response) => {
  try {
    const { title, value, type } : Transactions = request.body

    const createTransaction = transactionsRepository.create({title, type,value})

    return response.status(201).json(createTransaction)


  } catch (err) {
    console.log('status 400')
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
