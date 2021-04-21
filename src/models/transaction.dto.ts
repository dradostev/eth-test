import { TransactionStatus } from './transaction-status';

export interface TransactionDto {
  id: string;
  from: string;
  to: string;
  amount: string;
  status: TransactionStatus;
}
