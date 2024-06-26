import { BaseEntity } from 'src/common/database/base.entity';

import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @Column({ name: 'title', type: 'varchar', length: 256, nullable: false })
  brand: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.products)
  seller: UserEntity;

  @Column({ type: 'bigint', nullable: false, default: 0 })
  price: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  count: number;

  @ManyToOne(
    () => CategoryEntity,
    (categoryEntity) => categoryEntity.products,
    {
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'last_edited_by' })
  lastEditedBy: UserEntity;

  @OneToMany(
    () => TransactionEntity,
    (transactionEntity) => transactionEntity.product,
  )
  transactions: Array<TransactionEntity>;
}
