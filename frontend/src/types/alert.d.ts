import { Scalars } from '@/types';

export interface AlertEvent {
  title: Scalars['String'];
  message: Scalars['String'];
  fullscreen?: Scalars['Boolean'];
  cancellable?: Scalars['Boolean'];
  destination?: Scalars['String'];
}

export interface Alert extends AlertEvent {
  id: Scalars['String'];
  resolve?: Function;
  reject?: Function;
}
