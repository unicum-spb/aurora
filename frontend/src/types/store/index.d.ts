import { AuthState } from './auth.d';
import { ReportState } from './reports.d';
import { VersionState } from './version.d';
import { InterfaceState } from './interface.d';

export interface RootState {
  version: VersionState;
  Auth: AuthState;
  Reports: ReportState;
  Interface: InterfaceState;
}
