import { TypeQuantumReportModel } from '@/types';

import { inject } from '@loopback/core';
import { DefaultCrudRepository, juggler } from '@loopback/repository';

import { QuantumReportModel } from '../models';

export type QuantumReportCredentials = TypeQuantumReportModel;

export class ReportRepository extends DefaultCrudRepository<
  QuantumReportModel,
  typeof QuantumReportModel.prototype.id
  > {
  constructor(
    @inject('datasources.mongo') protected datasource: juggler.DataSource,
  ) {
    super(QuantumReportModel, datasource);
  }
}
