import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private contactRepository: Repository<Product>,
  ) {}

  async createAsync(createProductDto: CreateProductDto) {
    const product = this.contactRepository.create(createProductDto);
    return await this.contactRepository.save(product);
  }
}
