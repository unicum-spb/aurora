export interface AlertEvent {
  title: string;
  message: string;
  fullscreen?: boolean;
  cancellable?: boolean;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  fullscreen?: boolean;
  cancellable?: boolean;
  resolve?: Function;
  reject?: Function;
}
