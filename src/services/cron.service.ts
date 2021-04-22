import { Inject } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/models/account.entity';
import { Repository } from 'typeorm';
import { BlockchainService } from './blockchain.service';

export class CronService {
  constructor(
    @Inject('BlockchainService')
    private blockchainService: BlockchainService,
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {}

  @Timeout(3000)
  fetchAccounts() {
    this.blockchainService
      .getAccounts()
      .then((accounts) =>
        accounts.forEach(
          async (account) => await this.accountRepository.save(account),
        ),
      );
  }
}
