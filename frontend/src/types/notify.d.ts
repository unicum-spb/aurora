export interface NotificationEvent {
  type?: 'info' | 'error' | 'success';
  positionX?: 'left' | 'right' | 'center';
  positionY?: 'top' | 'bottom';
  message?: string;
  translate?: string;
  timeout?: number;
}

export interface Notification {
  id: string;
  type?: 'info' | 'error' | 'success';
  positionX: 'left' | 'right' | 'center';
  positionY: 'top' | 'bottom';
  message?: string;
  translate?: string;
  timeout?: number;
  resolve?: Function;
}
