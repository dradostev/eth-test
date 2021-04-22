import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/models/account.entity';
import { TransactionDto } from 'src/models/transaction.dto';
import { TransactionEntity } from 'src/models/transaction.entity';
import { Repository } from 'typeorm';
import { BlockchainService } from './blockchain.service';
import { ComissionService } from './comission.service';

@Injectable()
export class TransactionService {
  constructor(
    private comissionService: ComissionService,
    @Inject('BlockchainService')
    private blockchainService: BlockchainService,
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
  ) {}

  async sendTransaction(
    from: string,
    to: string,
    amount: string,
  ): Promise<TransactionDto> {
    const value = this.comissionService.getComission(parseFloat(amount));

    try {
      const transaction = await this.blockchainService.sendTransaction(
        from,
        to,
        value,
      );

      await this.transactionRepository.save(transaction);
      await this.changeBalance(transaction);

      return transaction;
    } catch (e) {
      const error = e?.data?.stack?.split('\n')[0];
      throw new HttpException(error, 400);
    }
  }

  async getTransaction(transactionId: string): Promise<TransactionDto> {
    const transaction = await this.transactionRepository.findOne(transactionId);

    if (!transaction) {
      throw new HttpException('Transaction not found.', 404);
    }

    return transaction;
  }

  private async changeBalance(transaction: TransactionDto): Promise<void> {
    const sender = await this.accountRepository.findOne(transaction.from);
    const recepient = await this.accountRepository.findOne(transaction.to);

    if (!sender) {
      throw new HttpException('Sender account not found.', 404);
    }

    if (!recepient) {
      throw new HttpException('Recepient account not found.', 404);
    }

    const senderBalance = (
      parseInt(sender.balance) - parseInt(transaction.amount)
    ).toString();
    const recBalance = (
      parseInt(sender.balance) + parseInt(transaction.amount)
    ).toString();

    await this.accountRepository.update(sender.id, { balance: senderBalance });
    await this.accountRepository.update(recepient.id, { balance: recBalance });
  }
}
