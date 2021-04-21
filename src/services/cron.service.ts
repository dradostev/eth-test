import { Inject } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { AccountRepository } from 'src/repositories/account.repository';
import { BlockchainService } from './blockchain.service';

export class CronService {
  constructor(
    @Inject('BlockchainService') private blockchainService: BlockchainService,
    private accountRepository: AccountRepository,
  ) {}

  @Timeout(3000)
  fetchAccounts() {
    this.blockchainService
      .getAccounts()
      .then((accounts) => accounts.map(this.accountRepository.saveAccount));
  }
}
