export interface Notification {
  type?: 'info' | 'error' | 'success';
  positionX?: 'left' | 'right' | 'center';
  positionY?: 'top' | 'bottom';
  message?: string;
  translate?: string;
  timeout?: number;
}

export interface NotificationEvent {
  id: string;
  type?: 'info' | 'error' | 'success';
  positionX: 'left' | 'right' | 'center';
  positionY: 'top' | 'bottom';
  message?: string;
  translate?: string;
  timeout?: number;
  resolve?: Function;
}
