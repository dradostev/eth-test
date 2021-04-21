import { Controller, Get, Inject } from '@nestjs/common';
import { AccountDto } from 'src/models/account.dto';
import { BlockchainService } from 'src/services/blockchain.service';

@Controller('accounts')
export class AccountController {
  constructor(
    @Inject('BlockchainService') private blockchainService: BlockchainService,
  ) {}

  @Get()
  async getAccounts(): Promise<AccountDto[]> {
    const accounts = await this.blockchainService.getAccounts();

    return accounts;
  }
}
