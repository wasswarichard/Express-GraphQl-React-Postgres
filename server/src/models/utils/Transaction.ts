import {
   Entity,
   UpdateDateColumn,
   CreateDateColumn,
   BaseEntity,
   Column,
} from 'typeorm';

@Entity()
export class Transaction extends BaseEntity {
   @Column({
      type: 'character varying',
   })
   block_index?: string;

   @CreateDateColumn()
   created_at?: Date;

   @UpdateDateColumn()
   updated_at?: Date;
}
