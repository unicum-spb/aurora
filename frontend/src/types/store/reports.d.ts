import { Dictionary, Scalars } from '@/types';
import { QuantumReportModel } from '@/types/api';

import { Pending } from '../shared';

export interface ReportState {
  list: Array<QuantumReportModel>;
  selected: QuantumReportModel;
  compare: Array<QuantumReportModel>;
  types: Array<Dictionary<Scalars['String']>>
  pending: Dictionary<Pending>;
  errors: Dictionary<any>;
}
