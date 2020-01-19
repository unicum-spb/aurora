import { Dictionary } from '@/types';
import { Pending } from '../shared';
import { User } from '../api';


export interface AccountState {
  account: User
  pending: Dictionary<Pending>
  errors: Dictionary<any>
}
