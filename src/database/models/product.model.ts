import { DataTypes } from 'sequelize';
import {
  AllowNull,
  BeforeCreate,
  BelongsTo,
  Column,
  ForeignKey,
  Table,
  Unique,
  Validate,
} from 'sequelize-typescript';

import { PRODUCT_TABLE_NAME } from '@Constants';
import { Category } from '@Models';
import { generateRandomSKU } from '@Utils';

import { BaseModel } from './base.model';

export interface IProductCreationAttr {
  title: string;
  description: string | null;
  price: string;
  categoryId: number;
}

@Table({
  tableName: PRODUCT_TABLE_NAME,
  timestamps: false,
})
export class Product extends BaseModel<Product, IProductCreationAttr> {
  @Column
  title: string;

  @AllowNull
  @Column(DataTypes.TEXT)
  description: string | null;

  @Validate({
    len: [8, 8],
  })
  @Unique
  @Column(DataTypes.STRING(8))
  SKU: string;

  @Column(DataTypes.DECIMAL(10, 2))
  price: string; // string to avoid floating point precision issues

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  /**
   * Relations
   */
  @BelongsTo(() => Category)
  category: Category;

  /**
   * Hooks
   */
  @BeforeCreate
  static async generateSKU(instance: Product) {
    let sku: string;
    let exists: boolean;

    do {
      /**
       * Generate a random SKU and check if it already exists in the database.
       * If it does, generate a new one until a unique SKU is found.
       * This is to ensure that the SKU is unique.
       * This is a very basic implementation and may not be suitable for production.
       * A better approach would be to use a UUID or a more complex algorithm to generate unique SKUs.
       * This is just for demonstration purposes.
       * Because of the nature of the random generation, there is a very small chance that the SKU may not be unique.
       * In a production environment, a more robust solution should be implemented.
       * We are using a simple 8-character string for demonstration purposes, and there is a very small chance of collision.
       */
      sku = generateRandomSKU(8);
      const product = await Product.findOne({ where: { SKU: sku } });
      exists = !!product;

      if (exists) {
        console.log(`SKU ${sku} already exists, generating a new one...`);
      }
    } while (exists);

    instance.SKU = sku;
  }
}
