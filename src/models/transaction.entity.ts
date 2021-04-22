import { Column, Entity, PrimaryColumn } from 'typeorm';
import { TransactionDto } from './transaction.dto';

@Entity('transactions')
export class TransactionEntity implements TransactionDto {
  @PrimaryColumn()
  id: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column({ type: 'numeric' })
  amount: string;
}
