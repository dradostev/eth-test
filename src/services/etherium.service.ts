import { AccountDto } from 'src/models/account.dto';
import { TransactionDto } from 'src/models/transaction.dto';
import { BlockchainService } from './blockchain.service';

export class EtheriumService implements BlockchainService {
  getAccounts(): Promise<AccountDto[]> {
    throw new Error('Method not implemented.');
  }
  sendTransaction(
    from: string,
    to: string,
    amount: string,
  ): Promise<TransactionDto> {
    throw new Error('Method not implemented.');
  }
  getTransaction(transactionId: string): Promise<TransactionDto> {
    throw new Error('Method not implemented.');
  }
}
