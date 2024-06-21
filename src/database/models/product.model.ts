import { DataTypes } from 'sequelize';
import {
  AllowNull,
  BeforeCreate,
  BelongsTo,
  Column,
  ForeignKey,
  Table,
  Unique, Validate,
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
