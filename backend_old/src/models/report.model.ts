import { ReportMeta, ReportResult, Scalars } from '@/types';

import { Entity, model, property } from '@loopback/repository';

@model()
export class QuantumReportModel extends Entity {
  @property({ type: 'string', id: true })
  id: Scalars['String'];

  @property({ type: 'object', required: true })
  meta: ReportMeta;

  @property({ type: 'array', itemType: 'object', required: true })
  reports: Array<ReportResult>;

  constructor(data?: Partial<QuantumReportModel>) {
    super(data);
  }
}
