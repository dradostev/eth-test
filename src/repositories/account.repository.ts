import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { AccountDto } from 'src/models/account.dto';
import { TransactionDto } from 'src/models/transaction.dto';
import Web3 from 'web3';

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

  async changeBalance(transaction: TransactionDto): Promise<void> {
    const pool = new Pool({
      user: 'ethereum',
      password: '1234',
      host: 'localhost',
      database: 'cryptocurrency',
      port: 5432,
    });

    const amount = Web3.utils.toWei(transaction.amount, 'ether');
    const subQuery = 'UPDATE accounts SET balance = balance - $1 WHERE id = $2';
    const addQuery = 'UPDATE accounts SET balance = balance + $1 WHERE id = $2';

    await pool.query(subQuery, [amount, transaction.from]);
    await pool.query(addQuery, [amount, transaction.from]);
  }
}
