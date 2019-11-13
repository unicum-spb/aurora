import { Scalars } from '@/types';

import { genSalt, hash, compare } from 'bcryptjs';
import { inject } from '@loopback/core';
import { PasswordHasherBindings } from '../keys';

/**
 * Service HashPassword using module 'bcryptjs'.
 * It takes in a plain password, generates a salt with given
 * round and returns the hashed password as a Scalars['String']
 */
export type HashPassword = (
  password: Scalars['String'],
  rounds: Scalars['Number'],
) => Promise<Scalars['String']>;
// bind function to `services.bcryptjs.HashPassword`
export async function hashPassword(
  password: Scalars['String'],
  rounds: Scalars['Number'],
): Promise<Scalars['String']> {
  const salt = await genSalt(rounds);
  return hash(password, salt);
}

export interface PasswordHasher<T = Scalars['String']> {
  hashPassword(password: T): Promise<T>;
  comparePassword(providedPass: T, storedPass: T): Promise<Scalars['Boolean']>;
}

export class BcryptHasher implements PasswordHasher<Scalars['String']> {
  constructor(
    @inject(PasswordHasherBindings.ROUNDS)
    private readonly rounds: Scalars['Number'],
  ) { }

  async hashPassword(password: Scalars['String']): Promise<Scalars['String']> {
    const salt = await genSalt(this.rounds);
    return hash(password, salt);
  }

  async comparePassword(
    providedPass: Scalars['String'],
    storedPass: Scalars['String'],
  ): Promise<Scalars['Boolean']> {
    const passwordIsMatched = await compare(providedPass, storedPass);
    return passwordIsMatched;
  }
}