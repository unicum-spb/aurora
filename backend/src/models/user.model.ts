import { Scalars } from '@/types';

import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    indexes: {
      uniqueEmail: {
        keys: {
          email: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})
export class User extends Entity {
  @property({ type: 'string', id: true })
  id: Scalars['String'];

  @property({ type: 'string', required: true })
  email: Scalars['String'];

  @property({ type: 'string', required: true })
  password: Scalars['String'];

  @property({ type: 'string' })
  firstName?: Scalars['String'];

  @property({ type: 'string' })
  lastName?: Scalars['String'];

  constructor(data?: Partial<User>) {
    super(data);
  }
}