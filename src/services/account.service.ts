import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountDto } from 'src/models/account.dto';
import { AccountEntity } from 'src/models/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {}

  async getAccounts(): Promise<AccountDto[]> {
    return await this.accountRepository.find();
  }
}
