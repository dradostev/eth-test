import { Inject } from '@nestjs/common';
import { TransactionDto } from 'src/models/transaction.dto';
import { BlockchainService } from './blockchain.service';
import { ComissionService } from './comission.service';

export class TransactionService {
  constructor(
    @Inject('BlockchainService') private blockchainService: BlockchainService,
    private comissionService: ComissionService,
  ) {}

  async sendTransaction(
    from: string,
    to: string,
    amount: string,
  ): Promise<TransactionDto> {
    const value = this.comissionService.getComission(parseFloat(amount));
    const transaction = await this.blockchainService.sendTransaction(
      from,
      to,
      value,
    );

    return transaction;
  }

  async getTransaction(transactionId: string): Promise<TransactionDto> {
    return null;
  }
}
