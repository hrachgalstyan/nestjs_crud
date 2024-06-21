import { ApiProperty } from '@nestjs/swagger';

import { ProductEntity } from '@SwaggerEntities';

import { BaseEntity } from './base.entity';

export class CategoryEntity extends BaseEntity {
  @ApiProperty({
    example: 'Category title',
    description: 'The title of the category',
  })
  title: string;

  @ApiProperty({
    example: 'Category description',
    description: 'The description of the category',
  })
  description: string | null;

  /**
   * Relations
   */
  @ApiProperty({
    type: () => [ProductEntity],
    description: 'The products that belong to the category',
  })
  products: ProductEntity[];
}
