import { ApiProperty, OmitType } from '@nestjs/swagger';

import { ProductEntity } from '@SwaggerEntities';

export class GetProductEntity extends OmitType(ProductEntity, [
  'categoryId',
] as const) {
  @ApiProperty({
    example: 'SKU12345',
    description: 'The SKU of the product',
    required: true,
  })
  SKU: string;
}
