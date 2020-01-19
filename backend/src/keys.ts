import { BindingKey } from '@loopback/context';
import { TokenService, UserService } from '@loopback/authentication';

import { PasswordHasher } from './services/hash.password.bcryptjs';
import { ReportService } from './services';

import { User } from './models';
import { Credentials } from './repositories';
import { TypeQuantumReportModel } from './types';

export namespace EnvironmentServiceConstants {
  export const ROOT = process.cwd();
  export const UPLOAD_PATH = `${ROOT}/uploads/`
  export const TEMP_PATH = `${ROOT}/temp/`
}

export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = 'myjwts3cr3t';
  export const TOKEN_EXPIRES_IN_VALUE = '6000';
}

export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string>('authentication.jwt.secret');
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>('authentication.jwt.expires.in.seconds');
  export const TOKEN_SERVICE = BindingKey.create<TokenService>('services.authentication.jwt.tokenservice');
}

export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>('services.hasher');
  export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}

export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<UserService<User, Credentials>>('services.user.service');
}

export namespace ReportServiceBindings {
  export const REPORT_SERVICE = BindingKey.create<ReportService<Array<Express.Multer.File>, Omit<TypeQuantumReportModel, 'id'>[]>>('services.report.service');
}
