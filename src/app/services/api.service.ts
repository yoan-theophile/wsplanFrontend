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

  getWorkingHourRangeList(): Observable<WorkingHourRange[]> {
    return this.http.get<WorkingHourRange[]>(`${this.baseUrl}/working_hour_range`);
  }
}
