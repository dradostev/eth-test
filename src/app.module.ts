import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { TransactionController } from './controllers/transaction.controller';
import { AccountRepository } from './repositories/account.repository';
import { ComissionService } from './services/comission.service';
import { EtheriumService } from './services/etherium.service';
import { TransactionService } from './services/transaction.service';
import { CronService } from './services/cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TransactionRepository } from './repositories/transaction.repository';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [TransactionController, AccountController],
  providers: [
    {
      provide: 'BlockchainService',
      useFactory: () => new EtheriumService(process.env.ETH_NODE_URL),
    },
    {
      provide: ComissionService,
      useFactory: () => new ComissionService(parseFloat('1.5')),
    },
    TransactionService,
    CronService,
    AccountRepository,
    TransactionRepository,
  ],
})
export class AppModule {}
