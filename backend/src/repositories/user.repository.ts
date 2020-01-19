import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, juggler, HasManyRepositoryFactory, repository, HasOneRepositoryFactory } from '@loopback/repository';

import { User, UserCredentials, QuantumReportModel } from '../models';
// import { OrderRepository } from './order.repository';
import { ReportRepository } from './report.repository';
import { UserCredentialsRepository } from './user-credentials.repository';

export type Credentials = {
  email: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
  > {
  public reports: HasManyRepositoryFactory<QuantumReportModel, typeof User.prototype.id>;

  public readonly userCredentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof User.prototype.id
  >;

  constructor(
    @inject('datasources.mongo') protected datasource: juggler.DataSource,
    @repository(ReportRepository) protected reportRepository: ReportRepository,
    @repository.getter('UserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
  ) {
    super(User, datasource);
    this.userCredentials = this.createHasOneRepositoryFactoryFor(
      'userCredentials',
      userCredentialsRepositoryGetter,
    );
    this.reports = this.createHasManyRepositoryFactoryFor(
      'reports',
      async () => reportRepository,
    );
  }

  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<UserCredentials | undefined> {
    try {
      return await this.userCredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
