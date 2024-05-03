import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createTransaction(@Body() body: { userId: number; amount: number; type: string }) {
    return this.transactionService.createTransaction(body.userId, body.amount, body.type);
  }

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  getUserTransactions(@Param('userId') userId: number) {
    return this.transactionService.getUserTransactions(userId);
  }
}
