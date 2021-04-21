import { Injectable } from '@nestjs/common';

@Injectable()
export class ComissionService {
  constructor(private percent: number) {}

  getComission(value: number): number {
    return value - (value / 100) * this.percent;
  }
}
