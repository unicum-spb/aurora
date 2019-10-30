import { Entity, model, property, belongsTo } from '@loopback/repository';
import { User } from './user.model';

@model()
export class Order extends Entity {
  @property({ type: 'string', id: true })
  orderId?: string;

  // Each order belongs to a user, indentified by its id (userId)
  @belongsTo(() => User)
  userId: string;

  @property({ type: 'number' })
  total?: number;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}