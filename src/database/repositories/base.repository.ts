import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOptions, FindOptions, WhereOptions } from 'sequelize';
import { Attributes, FindAndCountOptions } from 'sequelize/types/model';
import { MakeNullishOptional } from 'sequelize/types/utils';
import { Model, ModelCtor } from 'sequelize-typescript';

import { IBaseRepository } from '@Interfaces';
import { notFoundMessage } from '@Utils';

@Injectable()
export class BaseRepository<T extends Model, M>
  implements IBaseRepository<T, M>
{
  model: ModelCtor<T>;

  constructor(model: ModelCtor<T>) {
    this.model = model;
  }

  async findAll(findOptions: FindOptions<T>): Promise<T[]> {
    return this.model.findAll<T>(findOptions);
  }

  async findAndCountAll(
    options: FindAndCountOptions<Attributes<T>>,
  ): Promise<{ rows: T[]; count: number }> {
    return this.model.findAndCountAll<T>(options);
  }

  async findOrCreate(
    findOptions: WhereOptions<T>,
    defaults: M & MakeNullishOptional<T['_creationAttributes']>,
  ): Promise<[T, boolean]> {
    return this.model.findOrCreate({ where: findOptions, defaults });
  }

  async findOne(id: number, findOptions?: FindOptions<T>): Promise<T> {
    return this.model.findByPk<T>(id, findOptions);
  }

  async findOneOrFail(id: number, findOptions?: FindOptions<T>): Promise<T> {
    const record = await this.findOne(id, findOptions);

    if (!record) {
      throw new NotFoundException(notFoundMessage(this.model.name));
    }

    return record;
  }

  async create(entity: M, createOptions?: CreateOptions<T>): Promise<T> {
    return this.model.create<T>(
      entity as MakeNullishOptional<T['_creationAttributes']>,
      createOptions,
    );
  }

  async update(id: number, entity: Partial<M>): Promise<void> {
    await this.model.update<any>(entity, {
      where: { id },
      individualHooks: true,
    });
  }

  async updateOrFail(id: number, entity: Partial<M>): Promise<void> {
    const record = await this.findOneOrFail(id);
    await record.update(entity);
  }

  async delete(id: number): Promise<void> {
    await this.model.destroy<any>({ where: { id } });
  }

  async deleteOrFail(id: number): Promise<void> {
    const record = await this.findOneOrFail(id);
    await record.destroy();
  }
}
