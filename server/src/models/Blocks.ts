import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Transaction } from './utils/Transaction';
import { BlockDetails } from './BlockDetails';

@Entity({ name: 'blocks' })
export class Blocks extends Transaction {
   constructor(
      hash: string,
      height: string,
      time: string,
      transactions: BlockDetails[]
   ) {
      super();
      this.hash = hash;
      this.height = height;
      this.time = time;
      this.transactions = transactions;
   }

   @PrimaryColumn({
      unique: true,
      type: 'character varying',
   })
   hash: string;

   @Column({
      type: 'character varying',
   })
   height: string;

   @Column({
      type: 'character varying',
   })
   time: string;

   @OneToMany(() => BlockDetails, (details) => details.hash)
   transactions: BlockDetails[];
}
