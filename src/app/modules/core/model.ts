export interface WorkingHourRange {
  id?: string;
  start_time: string;
  end_time: string;
  date: string;
  studentId?: number;
}

export interface APIResponse<T> {
  results: Array<T>;
}

export class Alert {
  id?: string;
  type!: AlertType;
  message?: string;
  autoClose?: boolean;
  keepAfterRouteChange?: boolean;
  fade?: boolean;

  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
  }
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning,
}

export class User {
  id!: number;
  email!: string;
  class!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  token!: string;
  sex!: string;
  lastLog!: string;
  profile!: UserProfile;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}

export enum UserProfile {
  Student,
  Manager,
  Visitor
}
