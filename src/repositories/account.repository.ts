import { Injectable } from '@nestjs/common';
import { Pool, PoolConfig } from 'pg';
import { AccountDto } from 'src/models/account.dto';

@Injectable()
export class AccountRepository {
  async saveAccount(dto: AccountDto): Promise<void> {
    const pool = new Pool({
      user: 'ethereum',
      password: '1234',
      host: 'localhost',
      database: 'cryptocurrency',
      port: 5432,
    });
    const query =
      'INSERT INTO accounts VALUES ($1, $2) ON CONFLICT (id) DO NOTHING';
    await pool.query(query, [dto.id, parseInt(dto.balance)]);
  }

  async getAccounts(): Promise<AccountDto[]> {
    const pool = new Pool({
      user: 'ethereum',
      password: '1234',
      host: 'localhost',
      database: 'cryptocurrency',
      port: 5432,
    });
    const result = await pool.query('SELECT * FROM accounts');

    const dtos: AccountDto[] = result.rows.map((row) => {
      return {
        id: row.id,
        balance: row.balance.toString(),
      };
    });

    return dtos;
  }
}
