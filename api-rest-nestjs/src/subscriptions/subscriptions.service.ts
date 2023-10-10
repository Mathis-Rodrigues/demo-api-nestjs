import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  async createSubscriptionAsync(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    const { contactId, productId, startDate, endDate } = createSubscriptionDto;

    const newSubscription = this.subscriptionRepository.create({
      contact: { id: contactId },
      product: { id: productId },
      startDate,
      endDate,
    });

    return this.subscriptionRepository.save(newSubscription);
  }

  async getSubscriptionsByContactIdAsync(
    contactId: number,
  ): Promise<Subscription[]> {
    const subscriptions = await this.subscriptionRepository.find({
      where: { contact: { id: contactId } },
    });

    if (!subscriptions || subscriptions.length === 0) {
      throw new NotFoundException(
        `No subscriptions found for contact with ID ${contactId}.`,
      );
    }

    return subscriptions;
  }

  async updateSubscriptionAsync(
    id: number,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id: id },
    });

    if (!subscription) {
      throw new NotFoundException(
        `Subscription with ID ${id} not found. Cannot update.`,
      );
    }

    subscription.startDate = updateSubscriptionDto.startDate;
    subscription.endDate = updateSubscriptionDto.endDate;

    return await this.subscriptionRepository.save(subscription);
  }

  async deleteSubscriptionAsync(id: number): Promise<void> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id: id },
    });

    if (!subscription) {
      throw new NotFoundException(
        `Subscription with ID ${id} not found. Cannot delete.`,
      );
    }

    await this.subscriptionRepository.delete(subscription);
  }
}
