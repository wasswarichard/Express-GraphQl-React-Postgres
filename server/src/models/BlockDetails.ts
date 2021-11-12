import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   ManyToOne,
   JoinColumn,
} from 'typeorm';
import { Transaction } from './utils/Transaction';
import { Blocks } from './Blocks';

@Entity('blockDetails')
export class BlockDetails extends Transaction {
   constructor(id: number, prev_block: string, size: string, hash: Blocks) {
      super();
      this.prev_block = prev_block;
      this.id = id;
      this.size = size;
      this.hash = hash;
   }

   @PrimaryGeneratedColumn()
   id: number;

   @Column({
      type: 'character varying',
   })
   prev_block: string;

   @Column({
      type: 'character varying',
   })
   size: string;

   @ManyToOne(() => Blocks, (client) => client.transactions, {
      onDelete: 'CASCADE',
   })
   @JoinColumn({
      name: 'hash_id',
   })
   hash: Blocks;
}
