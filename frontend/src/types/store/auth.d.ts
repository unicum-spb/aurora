import { Dictionary, Scalars } from '@/types';
import { Pending } from '../shared.d';

export type Token = string | null;

export type User = {
  id: string;
  email: string;
}

export interface AuthState {
  user: User;
  token: Token;
  pending: Dictionary<Pending>;
  errors: Dictionary<Dictionary<Array<Scalars['String']>>>;
}
