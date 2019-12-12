import { TypeQuantumReportModel, Dictionary } from '@/types';

import { Pending } from '../shared';

export interface ReportState {
  reports: Array<TypeQuantumReportModel>;
  pending: Dictionary<Pending>;
  errors: Dictionary<any>;
}
