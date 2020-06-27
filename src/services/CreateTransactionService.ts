import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (!this.transactionsRepository.isValidType(type)) {
      throw new Error(
        `Invalid type '${type}' to create transaction. Use 'income' or 'outcome'.`,
      );
    }

    if (type === this.transactionsRepository.typeOutcome) {
      const balance = this.transactionsRepository.getBalance();

      if (value > balance.total) {
        throw new Error(
          'The value of the new outgoing transaction is greater than your balance.',
        );
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
