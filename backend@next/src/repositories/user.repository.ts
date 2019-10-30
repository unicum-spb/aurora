import {
  DefaultCrudRepository,
  juggler,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import { User, Order } from '../models';
import { inject } from '@loopback/core';

export type Credentials = {
  email: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
  > {
  public orders: HasManyRepositoryFactory<Order, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongo') protected datasource: juggler.DataSource,
  ) {
    super(User, datasource);
  }
}