import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { TransactionController } from './controllers/transaction.controller';
import { ComissionService } from './services/comission.service';
import { EtheriumService } from './services/etherium.service';
import { TransactionService } from './services/transaction.service';
import { CronService } from './services/cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './services/account.service';
import { AccountEntity } from './models/account.entity';
import { TransactionEntity } from './models/transaction.entity';

const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE } = process.env;

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: PGHOST,
      port: parseInt(PGPORT),
      username: PGUSER,
      password: PGPASSWORD,
      database: PGDATABASE,
      entities: [AccountEntity, TransactionEntity],
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([AccountEntity, TransactionEntity]),
  ],
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
    AccountService,
  ],
})
export class AppModule {}
