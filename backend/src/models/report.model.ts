import { ReportMeta, ReportResult, Scalars, ReportField, Physique, TypeQuantumReportModel } from '@/types';

import { Entity, model, property, belongsTo } from '@loopback/repository';

import { User } from './user.model';

@model()
export class PhysiqueModel extends Entity implements Physique {
  @property({ type: 'number', required: true })
  weight: Scalars['Number'];

  @property({ type: 'number', required: true })
  height: Scalars['Number'];
}

@model()
export class ReportMetaDataModel extends Entity implements ReportMeta {
  @property({ type: 'string', required: true })
  name: Scalars['String'];

  @property({ type: 'string', required: true })
  sex: ReportMeta['sex'];

  @property({ type: 'number', required: true })
  age: Scalars['Number'];

  @property({ type: PhysiqueModel, required: true })
  physique: ReportMeta['physique'];

  @property({ type: 'string', required: true })
  date: Scalars['String'];
}

@model()
export class ReportFieldModel extends Entity implements ReportField {
  @property({ type: 'string', required: true })
  title: Scalars['String'];

  @property({ type: 'number', required: true })
  min: Scalars['Number'];

  @property({ type: 'number', required: true })
  max: Scalars['Number'];

  @property({ type: 'number', required: true })
  value: Scalars['Number'];

  @property({ type: 'string', required: false })
  relative: Scalars['String'];
}

@model()
export class ReportResultModel extends Entity implements ReportResult {
  @property({ type: 'string', required: true })
  title: Scalars['String'];

  @property.array(ReportFieldModel, { required: true })
  fields: Array<ReportField>;

  constructor(data?: Partial<ReportResultModel>) {
    super(data);
  }
}

@model()
export class QuantumReportModel extends Entity implements TypeQuantumReportModel {
  @property({
    type: 'string',
    id: true,
    mongodb: { dataType: 'ObjectID' }
  })
  id: Scalars['String'];

  // Each order belongs to a user, identified by its id (userId)
  @belongsTo(
    () => User,
    {},
    {
      type: 'string',
      required: true,
      mongodb: { dataType: 'ObjectID' }
    }
  )
  userId: string;

  @property({ type: ReportMetaDataModel, required: true })
  meta: ReportMeta;

  @property.array(ReportResultModel, { required: true })
  reports: Array<ReportResult>;

  constructor(data?: Partial<QuantumReportModel>) {
    super(data);
  }
}
