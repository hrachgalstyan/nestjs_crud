import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Product } from '@Models';
import { ProductRepository } from '@Repositories';
import { ProductsController } from '@Modules/products/products.controller';
import { ProductsService } from '@Modules/products/products.service';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository],
})
export class ProductsModule {}
