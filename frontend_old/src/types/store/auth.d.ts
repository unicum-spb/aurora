import { Dictionary } from '@/types';
import { Pending } from '../shared.d';

export type Token = string | null;

export type User = {
  email?: string;
  id?: string;
}

export interface AuthState {
  user: User;
  token: Token;
  pending: Dictionary<Pending>;
  errors: Dictionary<any>;
}
