// переменные окружения
// определены в .env-файлах

class Environment {
  protected readonly DEVELOPMENT: string;
  protected readonly PRODUCTION: string;
  protected readonly STAGING: string;
  protected readonly NODE_ENV: string;
  protected readonly VUE_APP_API_URL: string;
  protected readonly VUE_APP_PROJECT: string;
  protected readonly BASE_URL: string;
  protected readonly DOCKER: string;

  constructor () {
    this.DEVELOPMENT = 'development';
    this.PRODUCTION = 'production';
    this.STAGING = 'staging';
    this.BASE_URL = process.env.BASE_URL || '';
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.VUE_APP_API_URL = process.env.VUE_APP_API_URL || '';
    this.VUE_APP_PROJECT = process.env.VUE_APP_PROJECT || '';
    this.DOCKER = process.env.DOCKER || 'false';
  }

  public get CurrentProject (): string {
    return this.VUE_APP_PROJECT || '';
  }

  public get isDevelopment (): boolean {
    return [ this.DEVELOPMENT, this.STAGING ].includes(this.NODE_ENV);
  }

  public get isStaging (): boolean {
    return this.NODE_ENV === this.STAGING;
  }

  public get isProduction (): boolean {
    return this.NODE_ENV === this.PRODUCTION;
  }

  public get inDocker (): boolean {
    return this.DOCKER === 'true';
  }

  public get baseUrl (): string {
    return this.BASE_URL;
  }

  public get CurrentAPI (): string {
    return this.CurrentEnvironmentAPI;
  }

  protected get CurrentEnvironmentAPI (): string {
    return this.VUE_APP_API_URL;
  }
}

const EnvironmentService = new Environment();

export default EnvironmentService;
