import path from 'path';

import { BootMixin } from '@loopback/boot';
import { ApplicationConfig, BindingKey } from '@loopback/core';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import { RestExplorerBindings, RestExplorerComponent } from '@loopback/rest-explorer';
import { AuthorizationComponent, AuthorizationTags, } from '@loopback/authorization';
import { AuthenticationComponent, registerAuthenticationStrategy, } from '@loopback/authentication';


import { MyAuthenticationSequence } from './sequence';

import {
  TokenServiceBindings,
  UserServiceBindings,
  TokenServiceConstants,
  ReportServiceBindings,
  PasswordHasherBindings
} from './keys';

import {
  JWTService,
  MyUserService,
  MyReportService,
  BcryptHasher,
  CasbinAuthorizationProvider,
  createEnforcer
} from './services';

import { JWTAuthenticationStrategy } from './authentication-strategies';
import { SECURITY_SCHEME_SPEC } from './utils/security-spec';

/**
 * Information from package.json
 */
export interface PackageInfo {
  name: string;
  version: string;
  description: string;
}

export const PackageKey = BindingKey.create<PackageInfo>('application.package');

const pkg: PackageInfo = require('../package.json');

export class AuroraApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options?: ApplicationConfig) {
    super(options);

    /*
       This is a workaround until an extension point is introduced
       allowing extensions to contribute to the OpenAPI specification
       dynamically.
    */
    this.api({
      openapi: '3.0.0',
      info: { title: pkg.name, version: pkg.version },
      paths: {},
      components: { securitySchemes: SECURITY_SCHEME_SPEC },
      servers: [{ url: '/' }],
    });

    this.setUpBindings();

    // Bind authentication component related elements
    this.component(AuthenticationComponent);
    this.component(AuthorizationComponent);

    // authorization
    this.bind('casbin.enforcer').toDynamicValue(createEnforcer);
    this.bind('authorizationProviders.casbin-provider')
      .toProvider(CasbinAuthorizationProvider)
      .tag(AuthorizationTags.AUTHORIZER);

    // authentication
    registerAuthenticationStrategy(this, JWTAuthenticationStrategy);

    // Set up the custom sequence
    this.sequence(MyAuthenticationSequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });

    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  setUpBindings(): void {
    // Bind package.json to the application context
    this.bind(PackageKey).to(pkg);

    this.bind(TokenServiceBindings.TOKEN_SECRET).to(
      TokenServiceConstants.TOKEN_SECRET_VALUE,
    );

    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
      TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE,
    );

    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);

    // Bind bcrypt hash services
    this.bind(PasswordHasherBindings.ROUNDS).to(10);
    this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher);

    this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);
    this.bind(ReportServiceBindings.REPORT_SERVICE).toClass(MyReportService);
  }
}
