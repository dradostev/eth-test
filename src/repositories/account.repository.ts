import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { AccountDto } from 'src/models/account.dto';
import { TransactionDto } from 'src/models/transaction.dto';
import Web3 from 'web3';

const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE } = process.env;

@Injectable()
export class AccountRepository {
  async saveAccount(dto: AccountDto): Promise<void> {
    const pool = new Pool({
      user: PGUSER,
      password: PGPASSWORD,
      host: PGHOST,
      database: PGDATABASE,
      port: parseInt(PGPORT),
    });
    const query =
      'INSERT INTO accounts VALUES ($1, $2) ON CONFLICT (id) DO NOTHING';
    await pool.query(query, [dto.id, parseInt(dto.balance)]);
  }

  async getAccounts(): Promise<AccountDto[]> {
    const pool = new Pool({
      user: PGUSER,
      password: PGPASSWORD,
      host: PGHOST,
      database: PGDATABASE,
      port: parseInt(PGPORT),
    });
    console.log(pool);
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
      user: PGUSER,
      password: PGPASSWORD,
      host: PGHOST,
      database: PGDATABASE,
      port: parseInt(PGPORT),
    });

    const amount = parseFloat(Web3.utils.toWei(transaction.amount, 'ether'));
    const subQuery = 'UPDATE accounts SET balance = balance - $1 WHERE id = $2';
    const addQuery = 'UPDATE accounts SET balance = balance + $1 WHERE id = $2';

    await pool.query(subQuery, [amount, transaction.from]);
    await pool.query(addQuery, [amount, transaction.from]);
  }
}
