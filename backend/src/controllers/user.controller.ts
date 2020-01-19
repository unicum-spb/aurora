import { Scalars } from '@/types';

import _ from 'lodash';

import { inject } from '@loopback/core';
import { repository, model, property } from '@loopback/repository';
import { UserProfile, securityId, SecurityBindings } from '@loopback/security';
import { authenticate, TokenService, UserService, } from '@loopback/authentication';
import { post, param, get, requestBody, HttpErrors, getModelSchemaRef, put } from '@loopback/rest';

import { CredentialsRequestBody, UserProfileSchema, } from './specs/user-controller.specs';

import { validateCredentials } from '../services/validator';

import { Credentials } from '../repositories/user.repository';
import { PasswordHasher } from '../services/hash.password.bcryptjs';

import { User } from '../models';
import { UserRepository } from '../repositories';

import { TokenServiceBindings, PasswordHasherBindings, UserServiceBindings } from '../keys';
import { OPERATION_SECURITY_SPEC } from '../utils/security-spec';

@model()
export class NewUserRequest {
  @property({ type: 'string' })
  email: Scalars['String'];

  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

export class UserController {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    // @inject('services.RecommenderService')
    // public recommender: RecommenderService,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<User, Credentials>,
  ) { }

  @post('/users', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NewUserRequest, {
            title: 'NewUser',
          }),
        },
      },
    })
    newUserRequest: NewUserRequest,
  ): Promise<User> {
    // ensure a valid email value and password value
    validateCredentials(_.pick(newUserRequest, ['email', 'password']));

    // encrypt the password
    const password = await this.passwordHasher.hashPassword(
      newUserRequest.password,
    );

    try {
      // create the new user
      const savedUser = await this.userRepository.create(
        _.omit(newUserRequest, 'password'),
      );

      // set the password
      await this.userRepository
        .userCredentials(savedUser.id)
        .create({ password });

      return savedUser;
    } catch (error) {
      // MongoError 11000 duplicate key
      if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
        throw new HttpErrors.Conflict(JSON.stringify({ email: 'Email is already taken' }));
      } else {
        throw error;
      }
    }
  }

  /**
   * Create or update the shopping cart for a given user
   * @param userId User id
   * @param user user
   */
  @put('/users/{userId}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'User profile updated',
      },
    },
  })
  async update(
    @param.path.string('userId') userId: User['id'],
    @requestBody({ description: 'Update user data' }) user: User,
  ): Promise<void> {
    if (userId !== user.id) {
      throw new HttpErrors.BadRequest(`User id does not match: ${userId} !== ${user.id}`);
    }
    await this.userRepository.updateById(userId, user);
  }

  @get('/users/{userId}.json', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async findById(@param.path.string('userId') userId: string): Promise<User> {
    return this.userRepository.findById(userId);
  }

  @get('/users/me.json', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: UserProfileSchema,
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async printCurrentUser(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<UserProfile> {
    // (@jannyHou)FIXME: explore a way to generate OpenAPI schema
    // for symbol property
    currentUserProfile.id = currentUserProfile[securityId];
    delete currentUserProfile[securityId];
    return currentUserProfile;
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{ user: User, token: string }> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);

    return { user, token };
  }
}
