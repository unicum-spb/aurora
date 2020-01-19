import { AuthState } from './auth.d';
import { ReportState } from './reports.d';
import { VersionState } from './version.d';
import { InterfaceState } from './interface.d';
import { AccountState } from './account';

export interface RootState {
  version: VersionState;
  Auth: AuthState;
  Account: AccountState;
  Reports: ReportState;
  Interface: InterfaceState;
}
