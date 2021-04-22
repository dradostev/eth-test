import { Controller, Get } from '@nestjs/common';
import { AccountDto } from 'src/models/account.dto';
import { AccountService } from 'src/services/account.service';

@Controller('api/accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  async getAccounts(): Promise<AccountDto[]> {
    const accounts = await this.accountService.getAccounts();
    return accounts;
  }
}
