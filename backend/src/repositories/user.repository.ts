import { Scalars } from '@/types';

import { inject } from '@loopback/core';
import { DefaultCrudRepository, juggler } from '@loopback/repository';

import { User } from '../models';

export type UserCredentials = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
  > {

  constructor(
    @inject('datasources.mongo') protected datasource: juggler.DataSource,
  ) {
    super(User, datasource);
  }
}
