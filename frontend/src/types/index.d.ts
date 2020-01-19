import { ReportFieldModel, ReportMetaDataModel } from '@/types/api';

export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Number: number
  DateTime: Date | string | number
  Date: Date | string | number
};

export type Dictionary<T> = { [key: string]: T }
export type ErrorHandler = (err: Error) => void

export type Pending = boolean

export type Sex = 'male' | 'female'

export interface ComparedQuantumReportModel {
  title: ReportFieldModel['title'],
  dates: Array<ReportMetaDataModel['date']>
  value: Array<ReportFieldModel['value']>
  min: Array<ReportFieldModel['min']>
  max: Array<ReportFieldModel['max']>
}
