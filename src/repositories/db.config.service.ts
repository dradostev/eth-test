import { Injectable } from '@nestjs/common';
import { PoolConfig } from 'pg';

@Injectable()
export class DbConfigService {
  getConfig(): PoolConfig {
    return {
      user: 'ethereum',
      password: '1234',
      host: 'localhost',
      database: 'cryptocurrency',
      port: 5432,
    };
  }
}
