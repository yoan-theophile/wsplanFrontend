import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { WorkingHourRange } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // ! We do not use 'env.BASE_URL' because Access to XMLHttpRequest at 
  // ! 'localhost:3000' from origin 'http://localhost:4200' has been blocked by CORS policy.
  baseUrl: string = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  putWorkingHourRange(id: number, data: WorkingHourRange ): Observable<WorkingHourRange> {
    return this.http.put<WorkingHourRange>(`${this.baseUrl}/working_hour_range/${id}`, data);
  }

  deleteWorkingHourRange(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/working_hour_range/${id}`);
  }

  addWorkingHourRange(data: WorkingHourRange): Observable<WorkingHourRange> {
    return this.http.post<WorkingHourRange>(`${this.baseUrl}/working_hour_range`, data);
  }

  getWorkingHourRange(data: WorkingHourRange): Observable<WorkingHourRange> {
    return this.http.get<WorkingHourRange>(`${this.baseUrl}/working_hour_range`);
  }

  getWorkingHourRangeList(): Observable<WorkingHourRange[]> {
    return this.http.get<WorkingHourRange[]>(`${this.baseUrl}/working_hour_range`);
  }
}
