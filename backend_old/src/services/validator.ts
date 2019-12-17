import * as isemail from 'isemail';
import { HttpErrors } from '@loopback/rest';

import { Credentials } from '../repositories/user.repository';

export function validateCredentials(credentials: Credentials) {
  console.log({ credentials })

  // Validate Email
  if (!isemail.validate(credentials.email)) {
    throw new HttpErrors.UnprocessableEntity('email, invalid');
  }

  // Validate Password Length
  if (credentials.password.length < 8) {
    throw new HttpErrors.UnprocessableEntity('password, must be minimum 8 characters');
  }
}
