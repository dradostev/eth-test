import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { TransactionController } from './controllers/transaction.controller';
import { ComissionService } from './services/comission.service';
import { EtheriumService } from './services/etherium.service';
import { TransactionService } from './services/transaction.service';

@Module({
  imports: [],
  controllers: [TransactionController, AccountController],
  providers: [
    {
      provide: 'BlockchainService',
      useFactory: () => new EtheriumService('http://127.0.0.1:8545'),
    },
    {
      provide: ComissionService,
      useFactory: () => new ComissionService(parseFloat('1.5')),
    },
    TransactionService,
  ],
})
export class AppModule {}
