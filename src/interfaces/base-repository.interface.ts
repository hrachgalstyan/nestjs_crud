import { CreateOptions, FindOptions, WhereOptions } from 'sequelize';
import Model, { Attributes, FindAndCountOptions } from 'sequelize/types/model';
import { MakeNullishOptional } from 'sequelize/types/utils';
import { SetRequired } from 'sequelize/types/utils/set-required';

/**
 * Base repository interface
 * Defines the methods that should be implemented by the repository
 */
export interface IBaseRepository<T extends Model, M> {
  findAll(findOptions: FindOptions<T>): Promise<T[]>;

  findAndCountAll(
    options: SetRequired<FindAndCountOptions<Attributes<T>>, 'group'>,
  ): Promise<{ rows: T[]; count: number }>;

  findOrCreate(
    findOptions: WhereOptions<T>,
    defaults: M & MakeNullishOptional<T['_creationAttributes']>,
  ): Promise<[T, boolean]>;

  findOne(id: number, findOptions?: FindOptions<T>): Promise<T>;
  findOneOrFail(id: number, findOptions: FindOptions<T>): Promise<T>;

  create(entity: M, createOptions?: CreateOptions<T>): Promise<T>;

  update(id: number, entity: Partial<M>): Promise<void>;
  updateOrFail(id: number, entity: Partial<M>): Promise<void>;

  delete(id: number): Promise<void>;
  deleteOrFail(id: number): Promise<void>;
}
