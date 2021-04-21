import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CommitTransactionDto } from 'src/models/commit-transaction.dto';
import { TransactionDto } from 'src/models/transaction.dto';
import { TransactionService } from 'src/services/transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  async commitTransaction(
    @Body() dto: CommitTransactionDto,
  ): Promise<TransactionDto> {
    const transaction = await this.transactionService.sendTransaction(
      dto.from,
      dto.to,
      dto.amount,
    );

    return transaction;
  }

  @Get(':id')
  async getTransaction(@Param('id') id: string): Promise<TransactionDto> {
    const transaction = await this.transactionService.getTransaction(id);

    return transaction;
  }
}
