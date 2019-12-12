export interface User {
  id?: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface Body {
  email: string;
  password: string;
}

export interface Anonymous {
  token?: string;
}

export interface Anonymous2 {
  greeting?: string;
  date?: string;
  url?: string;
  headers?: Headers;
}

export interface Anonymous3 {
  id: string;
  email?: string;
  name?: string;
}

export interface Headers {
  'Content-Type'?: string;
}
