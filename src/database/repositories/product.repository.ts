import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { IProductCreationAttr, Product } from '@Models';

import { BaseRepository } from './base.repository';

/**
 * Product repository
 * We extend the BaseRepository to use the common methods
 */
@Injectable()
export class ProductRepository extends BaseRepository<
  Product,
  IProductCreationAttr
> {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {
    super(productModel);
  }
}
