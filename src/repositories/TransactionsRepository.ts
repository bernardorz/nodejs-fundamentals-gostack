import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Transactions{
  title : string;
  value : number;
  type: 'income' | 'outcome';
}

interface Balance{
  income : number;
  outcome : number;
  total : number;
}


interface TransactionsBalance{
  transactions : Transaction[],
  balance : Balance

}


class TransactionsRepository {
  private transactions: Transaction[];
  private balance : Balance

  constructor() {
    this.transactions = [];
    this.balance = {
      income : 0,
      outcome :0,
      total : 0
    }
  }

  public all(): TransactionsBalance {

    const transactions = this.transactions;
    const balance = this.balance

    return {transactions, balance}
  }

  // public getBalance(): Balance {
  //   // TODO
  // }

  public create({ title, value, type } : Transactions): Transaction {
    // TODO
   const transaction = new Transaction({ title, value, type})

   const checkedOverBalance = type === "outcome" && value > this.balance.total


   if(checkedOverBalance){
     throw new Error('Vc n tem isso de dinheiro')
   }


   switch (type) {
     case 'income':

     this.balance.income += value

       break;

    case 'outcome' :

    this.balance.outcome += value

    break

     default:
       break;
   }

   this.transactions.push(transaction)


   const transacationsIncome = this.transactions.filter(({ type }) => type === 'income').reduce((acc : number, { value } : Transactions) => acc+=value, 0)
   const transacationsOutcome = this.transactions.filter(({ type }) => type === 'outcome').reduce((acc : number, { value } : Transactions) => acc+=value, 0)


   this.balance.total = transacationsIncome - transacationsOutcome

  return transaction

  }
}

export default TransactionsRepository;
