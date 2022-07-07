export interface WorkingHourRange {
  id?: string;
  start_time: string;
  end_time: string;
  date: Date;
  student_id?: string;
  student_name?: string;
}

export interface APIResponse<T> {
    results: Array<T>
}