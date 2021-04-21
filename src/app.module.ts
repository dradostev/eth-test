import { Logger, Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { TransactionController } from './controllers/transaction.controller';
import { AccountRepository } from './repositories/account.repository';
import { ComissionService } from './services/comission.service';
import { EtheriumService } from './services/etherium.service';
import { TransactionService } from './services/transaction.service';
import { CronService } from './services/cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { Pool } from 'pg';
import { DbConfigService } from './repositories/db.config.service';

@Module({
  imports: [ScheduleModule.forRoot()],
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
    CronService,
    DbConfigService,
    AccountRepository,
  ],
})
export class AppModule {}
