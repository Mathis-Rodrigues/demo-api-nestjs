import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  async createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    return await this.subscriptionsService.createSubscriptionAsync(
      createSubscriptionDto,
    );
  }

  @Get('by-contact/:contactId')
  async getSubscriptionsByContactId(@Param('contactId') contactId: number) {
    return await this.subscriptionsService.getSubscriptionsByContactIdAsync(
      contactId,
    );
  }

  @Put(':id')
  async updateSubscription(
    @Param('id') id: number,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return await this.subscriptionsService.updateSubscriptionAsync(
      id,
      updateSubscriptionDto,
    );
  }

  @Delete(':id')
  async deleteSubscription(@Param('id') id: number) {
    return await this.subscriptionsService.deleteSubscriptionAsync(id);
  }
}
