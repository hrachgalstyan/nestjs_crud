import { OmitType } from '@nestjs/swagger';

import { PaginatedObjectType } from '@Responses';
import { ProductEntity } from '@SwaggerEntities';

export class GetAllProductsEntity extends PaginatedObjectType(
  OmitType(ProductEntity, ['categoryId']),
) {}
