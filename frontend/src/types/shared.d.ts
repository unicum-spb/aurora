export type Pending = boolean;
export type Cursor = string | number | null;
export type JSON = { [key: string]: any };

export type ErrorHandler = (err: Error) => void;

export type PendingObject = {
  key: string;
  value: Pending;
}

export type ErrorObject = {
  key: string;
  errors: Array<any>;
}

export type ValidationErrorItem = {
  message: string;
  type: string;
}

export type ValidationError = {
  field: string;
  errors: Array<ValidationErrorItem>;
}
