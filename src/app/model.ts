export interface WorkingHourRange {
  id?: string;
  start_time: string;
  end_time: string;
  date: string;
  studentId?: string;
}

export interface Student {
  id?: number;
  firstname: string;
  lastname: string;
  sex: string;
  class: string;
}

export interface APIResponse<T> {
    results: Array<T>
}

export class Alert {
  id?: string;
  type!: AlertType;
  message?: string;
  autoClose?: boolean;
  keepAfterRouteChange?: boolean;
  fade?: boolean;

  constructor(init?:Partial<Alert>) {
      Object.assign(this, init);
  }
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}

export class User {
  id!: number;
  email!: string;
  class!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  token!: string;
}