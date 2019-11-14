export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Number: number;
  DateTime: Date | string | number;
  Date: Date | string | number;
};


export type Pending = boolean;

export type PendingObject = {
  key: Scalars['String'];
  value: Pending;
}

export type Sex = 'male' | 'female';

export type Dictionary<T> = { [key: Scalars['String']]: T };
export type ErrorHandler = (err: Error) => void;

export type Physique = {
  weight: Scalars['Number'];
  height: Scalars['Number'];
}

export type ReportMeta = {
  name: Scalars['String'];
  sex: Sex;
  age: Scalars['Number'];
  physique: Physique;
  date: Scalars['String'];
}

export type ReportField = {
  title: Scalars['String'];
  min: Scalars['Number'];
  max: Scalars['Number'];
  value: Scalars['Number'];
}

export type ReportResult = {
  title: Scalars['String'];
  fields: Array<ReportField>;
};

export type QuantumReportModel = {
  meta: ReportMeta;
  reports: Array<ReportResult>;
};