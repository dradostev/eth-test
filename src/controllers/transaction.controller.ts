import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommitTransactionDto } from 'src/models/commit-transaction.dto';
import { TransactionDto } from 'src/models/transaction.dto';
import { BlockchainService } from 'src/services/blockchain.service';

@Controller('transactions')
export class TransactionController {
  constructor(private blockchainService: BlockchainService) {}

  @Post()
  async commitTransaction(
    @Body() dto: CommitTransactionDto,
  ): Promise<TransactionDto> {
    const transaction = await this.blockchainService.sendTransaction(
      dto.from,
      dto.to,
      dto.amount,
    );

    return transaction;
  }

  @Get(':id')
  async getTransaction(@Param('id') id: string): Promise<TransactionDto> {
    const transaction = await this.blockchainService.getTransaction(id);

    return transaction;
  }
}
