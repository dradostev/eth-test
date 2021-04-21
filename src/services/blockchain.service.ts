import { AccountDto } from 'src/models/account.dto';
import { TransactionDto } from 'src/models/transaction.dto';

export interface BlockchainService {
  getAccounts(): Promise<AccountDto[]>;
  sendTransaction(
    from: string,
    to: string,
    amount: string,
  ): Promise<TransactionDto>;
  getTransaction(transactionId: string): Promise<TransactionDto>;
}
