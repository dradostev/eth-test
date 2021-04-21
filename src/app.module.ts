import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { TransactionController } from './controllers/transaction.controller';
import { EtheriumService } from './services/etherium.service';

@Module({
  imports: [],
  controllers: [TransactionController, AccountController],
  providers: [
    {
      provide: 'BlockchainService',
      useFactory: () => {
        return new EtheriumService('http://127.0.0.1:8545');
      },
    },
  ],
})
export class AppModule {}
