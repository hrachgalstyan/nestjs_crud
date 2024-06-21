import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { LimitQueryValuePipe } from '@Pipes';
import { PaginatedResponse } from '@Responses';
import { ProductEntity } from '@SwaggerEntities';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetAllProductsEntity } from './entities/get-all-products.entity';
import { GetProductEntity } from './entities/get-product.entity';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOkResponse({ type: GetAllProductsEntity })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  getAllProducts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(15), ParseIntPipe, LimitQueryValuePipe)
    limit: number,
    @Query('categoryId') categoryId: number,
  ): Promise<PaginatedResponse<ProductEntity>> {
    return this.productsService.getAllProducts({ categoryId, page, limit });
  }

  @Post()
  @ApiBody({ type: CreateProductDto })
  @ApiCreatedResponse({ type: ProductEntity })
  createProduct(@Body() body: CreateProductDto): Promise<ProductEntity> {
    return this.productsService.createProduct(body);
  }

  @Get(':id')
  @ApiOkResponse({ type: GetProductEntity })
  getProduct(@Param('id', ParseIntPipe) id: number): Promise<GetProductEntity> {
    return this.productsService.getProduct(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateProductDto })
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ): Promise<void> {
    return this.productsService.updateProduct(id, body);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Product deleted successfully' })
  deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productsService.deleteProduct(id);
  }
}
