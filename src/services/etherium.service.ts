import { AccountDto } from 'src/models/account.dto';
import { TransactionDto } from 'src/models/transaction.dto';
import { BlockchainService } from './blockchain.service';
import Web3 from 'web3';

export class EtheriumService implements BlockchainService {
  private web3: Web3;

  constructor(rpcUrl: string) {
    this.web3 = new Web3(rpcUrl);
  }

  async getAccounts(): Promise<AccountDto[]> {
    const accounts = await this.web3.eth.getAccounts();
    const dtos = accounts.map(async (accountId) => {
      const balance = await this.web3.eth.getBalance(accountId);
      return {
        id: accountId,
        balance: this.web3.utils.fromWei(balance, 'ether'),
      };
    });

    return await Promise.all(dtos);
  }

  async sendTransaction(
    from: string,
    to: string,
    amount: number,
  ): Promise<TransactionDto> {
    const value = this.web3.utils.toWei(amount.toString(), 'ether');
    await this.web3.eth.sendTransaction({
      from,
      to,
      value,
    });

    return {
      id: '',
      from,
      to,
      amount: this.web3.utils.fromWei(value, 'ether'),
    };
  }
}
