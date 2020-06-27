import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDto {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  public typeIncome = 'income';

  public typeOutcome = 'outcome';

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public isValidType(type: string): boolean {
    return type === this.typeIncome || type === this.typeOutcome;
  }

  public getBalance(): Balance {
    const initialValue = 0;

    const income = this.transactions.reduce((accumulator, transaction) => {
      let tmpValue = 0;

      if (transaction.type === this.typeIncome) tmpValue = transaction.value;

      return accumulator + tmpValue;
    }, initialValue);

    const outcome = this.transactions.reduce((accumulator, transaction) => {
      let tmpValue = 0;

      if (transaction.type === this.typeOutcome) tmpValue = transaction.value;

      return accumulator + tmpValue;
    }, initialValue);

    const total = income - outcome;

    const balance = { income, outcome, total };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDto): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
