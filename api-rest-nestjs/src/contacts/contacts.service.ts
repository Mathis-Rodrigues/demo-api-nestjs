import { CreateContactDto } from './dto/create-contact.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  async createAsync(createContactDto: CreateContactDto) {
    const contact = this.contactRepository.create(createContactDto);
    return await this.contactRepository.save(contact);
  }
}
