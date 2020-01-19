import { Entity, model, property, hasMany, hasOne } from '@loopback/repository';
// import { Order } from './order.model';
import { UserCredentials } from './user-credentials.model';
import { QuantumReportModel } from './report.model';
import { Scalars } from '@/types';

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
  @property({
    id: true,
    type: 'string',
    mongodb: { dataType: 'ObjectID' }
  })
  id: Scalars['String'];

  @property({ type: 'string' })
  email: Scalars['String'];

  @property({ type: 'string' })
  firstName: Scalars['String'];

  @property({ type: 'string' })
  lastName: Scalars['String'];

  @hasMany(() => QuantumReportModel)
  reports: Array<QuantumReportModel>;

  @hasMany(() => User)
  watchers: Array<User>;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  constructor(data?: Partial<User>) {
    super(data);
  }
}
