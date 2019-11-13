import { Scalars } from '@/types';

import { Entity, model, property } from '@loopback/repository';

@model()
export class Product extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  productId: Scalars['String'];

  @property({
    type: 'string',
    required: true,
    id: true,
  })
  name: Scalars['String'];

  @property({
    type: 'number',
    required: true,
  })
  price: Scalars['Number'];

  constructor(data?: Partial<Product>) {
    super(data);
  }
}