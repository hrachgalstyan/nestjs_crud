import { PartialType, PickType } from '@nestjs/swagger';

import { ProductEntity } from '@SwaggerEntities';

export class UpdateProductDto extends PartialType(
  PickType(ProductEntity, ['title', 'description', 'price'] as const),
) {}
