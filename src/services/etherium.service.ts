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
        balance: this.web3.utils.fromWei(balance),
      };
    });

    console.log(dtos);

    return await Promise.all(dtos);
  }

  async sendTransaction(
    from: string,
    to: string,
    amount: string,
  ): Promise<TransactionDto> {
    const tx = await this.web3.eth.sendTransaction({
        from,
        to,
        value: this.web3.utils.toWei(amount),
      })
      .on('receipt', () => console.log('receipt'));

    return { id: 'ololo', from, to, amount, status: 'reciept' };
  }
  getTransaction(transactionId: string): Promise<TransactionDto> {
    throw new Error('Method not implemented.');
  }
}
