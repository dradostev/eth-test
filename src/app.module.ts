import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/transaction.controller';
import { EtheriumService } from './services/etherium.service';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [
    {
      provide: 'BlockchainService',
      useClass: EtheriumService,
    },
  ],
})
export class AppModule {}
