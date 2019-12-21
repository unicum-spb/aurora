import { Dictionary } from '@/types';
import { QuantumReportModel } from '@/types/api';

import { Pending } from '../shared';

export interface ReportState {
  list: Array<QuantumReportModel>;
  selected: QuantumReportModel;
  compare: Array<QuantumReportModel>;
  pending: Dictionary<Pending>;
  errors: Dictionary<any>;
}
