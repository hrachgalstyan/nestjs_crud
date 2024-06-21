import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Category, ICategoryCreationAttr } from '@Models';

import { BaseRepository } from './base.repository';

/**
 * Category repository
 * We extend the BaseRepository to use the common methods
 */
@Injectable()
export class CategoryRepository extends BaseRepository<
  Category,
  ICategoryCreationAttr
> {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) {
    super(categoryModel);
  }
}
