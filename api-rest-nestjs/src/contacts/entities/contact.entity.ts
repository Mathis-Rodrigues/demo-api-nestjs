import { Subscription } from '../../subscriptions/entities/subscription.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'contacts' })
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Subscription, (subscription) => subscription.contact)
  subscriptions: Subscription[];
}
