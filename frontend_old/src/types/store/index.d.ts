import { AuthState } from './auth.d';
import { ReportState } from './reports.d';
import { VersionState } from './version.d';

export interface RootState {
  version: VersionState;
  Auth: AuthState;
  Reports: ReportState;
}
