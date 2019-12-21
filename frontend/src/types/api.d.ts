export interface ShoppingCartItem {
  productId?: string;
  quantity?: number;
  price?: number;
}

export interface ShoppingCart {
  userId?: string;
  items?: ShoppingCartItem[];
}

export interface PhysiqueModel {
  weight: number;
  height: number;
}

export interface ReportMetaDataModel {
  name: string;
  sex: string;
  age: number;
  physique: PhysiqueModel;
  date: string;
}

export interface ReportFieldModel {
  title: string;
  min: number;
  max: any;
  value: number;
}

export interface ReportResultModel {
  title: string;
  fields: ReportFieldModel[];
}

export interface QuantumReportModel {
  id: string;
  userId: string;
  meta: ReportMetaDataModel;
  reports: ReportResultModel[];
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

/** (Schema options: { title: 'NewUser' }) */
export interface NewUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface NewUserRequest {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
