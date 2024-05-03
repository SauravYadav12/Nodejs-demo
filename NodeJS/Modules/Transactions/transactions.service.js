import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { User } from './user.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createTransaction(userId: number, amount: number, type: string): Promise<Transaction> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    const transaction = new Transaction();
    transaction.amount = amount;
    transaction.type = type;
    transaction.user = user;

    return this.transactionRepository.save(transaction);
  }

  async getUserTransactions(userId: number): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}
