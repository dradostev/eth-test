import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AccountDto } from './account.dto';

@Entity('accounts')
export class AccountEntity implements AccountDto {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'numeric' })
  balance: string;
}
