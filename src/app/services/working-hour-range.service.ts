import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable, throwError } from 'rxjs';
import { delay, first } from 'rxjs/operators';
import { environment as env, environment } from 'src/environments/environment';
import { WorkingHourRange } from '../model';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class WorkingHourRangeService {
  private workingHourRangeList: BehaviorSubject<any> = new BehaviorSubject(
    null
  );
  public workingHourRangeList$: Observable<any> =
    this.workingHourRangeList.asObservable();

  constructor(private http: HttpClient, private alertService: AlertService) {}

  // helpers
  error(message: string) {
    return throwError(() => {
      const error: any = new Error(message);
      error.timestamps = new Date();
      return error;
    });
  }

  // route functions

  putWorkingHourRange(
    id: number,
    data: WorkingHourRange
  ): Observable<WorkingHourRange> {
    return this.http.put<WorkingHourRange>(
      `${environment.JSON_SERVER_URL}/users/1/working_hour_range/${id}`,
      data
    );
  }

  async delete(id: number) {
    const whr$ = await this.http
      .delete<any>(
        `${environment.JSON_SERVER_URL}/working_hour_range/${id}`
      )
      .pipe(delay(500));
    await lastValueFrom(whr$)
      .then(() => {
        this.getList();
      })
      .catch((err) => {
        console.log(err);
        this.error('An error occurred while deleting data.');
      });
  }

  async add(date: string, start_time: string, end_time: string) {
    const whr$ = await this.http
      .post<WorkingHourRange>(
        `${environment.JSON_SERVER_URL}/students/1/working_hour_range`,
        {
          date,
          start_time,
          end_time,
        }
      )
      .pipe(delay(500));
    await lastValueFrom(whr$)
      .then(() => {
        this.getList();
      })
      .catch((err) => {
        console.log(err);
        this.error('An error occurred while saving data.');
      });
  }

  getWorkingHourRange(data: WorkingHourRange): Observable<WorkingHourRange> {
    return this.http.get<WorkingHourRange>(
      `${environment.JSON_SERVER_URL}/users/1/working_hour_range`
    );
  }

  async getList() {
    const whr$ = await this.http
      .get<WorkingHourRange[]>(
        `${environment.JSON_SERVER_URL}/students/1/working_hour_range?_limit=7&_sort=id&_order=desc`
      )
      .pipe(delay(500));
    await lastValueFrom(whr$)
      .then((res) => {
        this.workingHourRangeList.next(res);
      })
      .catch((err) => {
        console.log(err);
        this.error('An error occurred while loading data.');
      });
  }
}
