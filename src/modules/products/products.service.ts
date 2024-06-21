import { Injectable } from '@nestjs/common';

import { Category, Product } from '@Models';
import { ProductRepository } from '@Repositories';
import { PaginatedResponse } from '@Responses';

import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductRepository) {}

  async getAllProducts({
    categoryId,
    page,
    limit,
  }: {
    categoryId: number;
    page: number;
    limit: number;
  }): Promise<PaginatedResponse<Product>> {
    const offset = (page - 1) * limit;

    const { rows, count } = await this.productsRepository.findAndCountAll({
      where: { categoryId },
      attributes: {
        exclude: ['categoryId'],
      },
      include: [Category],
      offset,
      limit,
      nest: true,
      raw: true,
    });

    return { rows, count, page, limit };
  }

  async createProduct(body: CreateProductDto): Promise<Product> {
    const product = await this.productsRepository.create(body);

    return product?.dataValues;
  }

  async getProduct(id: number): Promise<Product> {
    return this.productsRepository.findOneOrFail(id, {
      attributes: {
        exclude: ['categoryId'],
      },
      include: [Category],
      nest: true,
      raw: true,
    });
  }

  async updateProduct(id: number, body: Partial<Product>): Promise<void> {
    return this.productsRepository.updateOrFail(id, body);
  }

  async deleteProduct(id: number): Promise<void> {
    return this.productsRepository.deleteOrFail(id);
  }
}
