import { Controller, Get } from '@nestjs/common';
import { AccountDto } from 'src/models/account.dto';
import { AccountRepository } from 'src/repositories/account.repository';

@Controller('api/accounts')
export class AccountController {
  constructor(private accountRepository: AccountRepository) {}

  @Get()
  async getAccounts(): Promise<AccountDto[]> {
    const accounts = await this.accountRepository.getAccounts();

    return accounts;
  }
}
