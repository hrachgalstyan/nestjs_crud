import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { BaseEntity } from '@Swagger/entities/base.entity';
import { CategoryEntity } from '@Swagger/entities/category.entity';
import { mustBeNumber, mustBeString, requiredField } from '@Utils';

export class ProductEntity extends BaseEntity {
  @ApiProperty({
    example: 'Product title',
    description: 'The title of the product',
  })
  @IsString({ message: mustBeString('Title') })
  @IsNotEmpty({ message: requiredField('Title') })
  title: string;

  @ApiProperty({
    example: 'Product description',
    description: 'The description of the product',
  })
  @IsString({ message: mustBeString('Description') })
  @IsNotEmpty({ message: requiredField('Description') })
  @IsOptional()
  description: string | null;

  @ApiProperty({
    example: '100.00',
    description: 'The price of the product',
    type: 'decimal',
  })
  @IsNotEmpty({ message: requiredField('Price') })
  @IsDecimal(
    { decimal_digits: '2' },
    { message: 'Price must be a decimal number' },
  )
  price: string;

  @ApiProperty({
    example: 1,
    description: 'The id of the category',
  })
  @IsInt({ message: mustBeNumber('Category Id') })
  @IsNotEmpty({ message: requiredField('Category Id') })
  categoryId: number;

  /**
   * Entity Relations
   */
  @ApiProperty({
    type: () => PickType(CategoryEntity, ['id', 'title', 'description']),
    description: 'The category of the product',
  })
  category: CategoryEntity;
}
