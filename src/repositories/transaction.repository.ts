import { HttpException, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { TransactionDto } from 'src/models/transaction.dto';
import Web3 from 'web3';

@Injectable()
export class TransactionRepository {
  async saveTransaction(dto: TransactionDto): Promise<void> {
    const pool = new Pool({
      user: 'ethereum',
      password: '1234',
      host: 'localhost',
      database: 'cryptocurrency',
      port: 5432,
    });
    const amount = Web3.utils.toWei(dto.amount, 'ether');
    const query = 'INSERT INTO transactions VALUES ($1, $2, $3, $4)';
    await pool.query(query, [dto.id, dto.from, dto.to, amount]);
  }

  async getTransaction(id: string): Promise<TransactionDto> {
    const pool = new Pool({
      user: 'ethereum',
      password: '1234',
      host: 'localhost',
      database: 'cryptocurrency',
      port: 5432,
    });

    const result = await pool.query(
      'SELECT * FROM transactions WHERE id = $1',
      [id],
    );

    const row = result.rows[0];

    if (!row) {
      throw new HttpException('Transaction not found', 404);
    }

    return {
      id: row.id,
      from: row.from,
      to: row.to,
      amount: row.amount,
    };
  }
}
