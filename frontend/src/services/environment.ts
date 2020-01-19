import { Scalars } from '@/types';


class Environment {
  static get сurrentProject (): Scalars['String'] {
    return process.env.VUE_APP_PROJECT || '';
  }

  static get isDevelopment () {
    return process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging';
  }

  static get isStaging () {
    return process.env.NODE_ENV === 'staging';
  }

  static get isProduction () {
    return process.env.NODE_ENV === 'production';
  }

  static get baseUrl (): Scalars['String'] {
    return process.env.BASE_URL;
  }

  static get CurrentAPI () {
    return this.CurrentEnvironmentAPI;
  }

  static get CurrentEnvironmentAPI (): Scalars['String'] {
    return process.env.VUE_APP_API_URL;
  }
}

export default Environment;
