import { Contact } from '../../contacts/entities/contact.entity';
import { Product } from '../../products/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'subscriptions' })
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contact, (contact) => contact.subscriptions)
  contact: Contact;

  @ManyToOne(() => Product, (product) => product.subscriptions)
  product: Product;

  @CreateDateColumn()
  startDate: Date;

  @CreateDateColumn()
  endDate: Date;
}
