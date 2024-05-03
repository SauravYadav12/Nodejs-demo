import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;  // Note: In a real app, passwords should be hashed

  @OneToMany(() => Transaction, transaction => transaction.user)
  transactions: Transaction[];
}
