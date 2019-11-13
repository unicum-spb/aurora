import { Scalars } from '@/types';

import { Entity, model, property, belongsTo } from '@loopback/repository';
import { User } from './user.model';

@model()
export class Order extends Entity {
  @property({ type: 'string', id: true })
  orderId?: Scalars['String'];

  // Each order belongs to a user, indentified by its id (userId)
  @belongsTo(() => User)
  userId: Scalars['String'];

  @property({ type: 'number' })
  total?: Scalars['Number'];

  constructor (data?: Partial<Order>) {
    super(data);
  }
}