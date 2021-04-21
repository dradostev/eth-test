import { Controller } from '@nestjs/common';
import { AccountDto } from 'src/models/account.dto';
import { BlockchainService } from 'src/services/blockchain.service';

@Controller('accounts')
export class AccountController {
  constructor(private blockchainService: BlockchainService) {}

  async getAccounts(): Promise<AccountDto[]> {
    const accounts = await this.blockchainService.getAccounts();

    return accounts;
  }
}
