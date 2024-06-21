import { DataTypes } from 'sequelize';
import { AllowNull, Column, HasMany, Table } from 'sequelize-typescript';

import { CATEGORY_TABLE_NAME } from '@Constants';
import { Product } from '@Models';

import { BaseModel } from './base.model';

export interface ICategoryCreationAttr {
  title: string;
  description: string | null;
}

@Table({
  tableName: CATEGORY_TABLE_NAME,
  timestamps: false,
})
export class Category extends BaseModel<Category, ICategoryCreationAttr> {
  @Column
  title: string;

  @AllowNull
  @Column(DataTypes.TEXT)
  description: string | null;

  /**
   * Relations
   */
  @HasMany(() => Product)
  products: Product[];
}
