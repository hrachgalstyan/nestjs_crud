import { PickType } from '@nestjs/swagger';

import { ProductEntity } from '@SwaggerEntities';

export class CreateProductDto extends PickType(ProductEntity, [
  'title',
  'description',
  'price',
  'categoryId',
] as const) {}
