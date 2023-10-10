import { Subscription } from '../../subscriptions/entities/subscription.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Subscription, (subscription) => subscription.product)
  subscriptions: Subscription[];
}
