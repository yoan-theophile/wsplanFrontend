import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable, throwError } from 'rxjs';
import { delay, first } from 'rxjs/operators';
import { environment as env, environment } from 'src/environments/environment';
import { Student, WorkingHourRange } from '../model';
import { AlertService } from './alert.service';
import { LoggerService } from './logger.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class WorkingHourRangeService {
  private workingHourRangeList: BehaviorSubject<any> = new BehaviorSubject(
    null
  );
  public workingHourRangeList$: Observable<any> =
    this.workingHourRangeList.asObservable();

  // This subject is used to update a working hour
  private currentWorkingHourRange: BehaviorSubject<WorkingHourRange> =
    new BehaviorSubject({
      start_time: '',
      end_time: '',
      date: '',
    });
  public currentWorkingHourRange$: Observable<WorkingHourRange> =
    this.currentWorkingHourRange.asObservable();

  // This subject is used to get the weekly planning
  private weeklyPlanning: BehaviorSubject<any> = new BehaviorSubject(null);
  public weeklyPlanning$: Observable<any> = this.weeklyPlanning.asObservable();

  // This subject is used to get the weekly planning
  private studentPlanning: BehaviorSubject<any> = new BehaviorSubject(null);
  public studentPlanning$: Observable<any> =
    this.studentPlanning.asObservable();

  constructor(
    private http: HttpClient,
    private loggerService: LoggerService,
    private userService: UserService
  ) {}

  setCurrentWorkingHourRange(workingHourRange: WorkingHourRange) {
    this.currentWorkingHourRange.next(workingHourRange);
  }

  setDefaultCurrentWorkingHourRange() {
    this.currentWorkingHourRange.next({
      start_time: '',
      end_time: '',
      date: '',
    });
  }

  async put(data: WorkingHourRange) {
    await lastValueFrom(
      this.http
        .put<WorkingHourRange>(
          `${environment.JSON_SERVER_URL}/working_hour_range/${data.id}`,
          data
        )
        .pipe(delay(500))
    )
      .then(() => {
        this.getList();
      })
      .catch((err) => {
        this.loggerService.error('An error occurred while saving data.');
      });
  }

  async delete(id: number) {
    const whr$ = await this.http
      .delete<any>(`${environment.JSON_SERVER_URL}/working_hour_range/${id}`)
      .pipe(delay(500));
    await lastValueFrom(whr$)
      .then(() => {
        this.getList();
      })
      .catch((err) => {
        this.loggerService.error('An error occurred while deleting data.');
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
        this.loggerService.error('An error occurred while saving data.');
      });
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
        this.loggerService.error(
          'An error occurred while loading data.',
          false
        );
      });
  }

  async getWeeklyPlanning() {
    let studentList: Student[] = [];
    this.userService.getList().then((res) => {
      studentList = res;
    });
    // je fais un split pour garder la premiere partie de la date au format
    // yyyy-mm-dd
    const todaysDate = new Date().toISOString().split('T')[0];
    const date = new Date();
    date.setDate(new Date().getDate() + 6);
    const dateInSixDays = date.toISOString().split('T')[0];

    await lastValueFrom(
      this.http
        .get<WorkingHourRange[]>(
          `${environment.JSON_SERVER_URL}/working_hour_range?date_gte=${todaysDate}&date_lte=${dateInSixDays}&_sort=date&_order=desc`
        )
        .pipe(delay(500))
    )
      .then((res) => {
        const weeklyPlanning = [...Array(7)].map((_, index) => {
          const todaysDate: Date = new Date();
          todaysDate.setDate(todaysDate.getDate() + index);

          let studentNumber = 0;
          const studentIdList: string[] | any = [];
          const workingHourList: any[] = [];
          res.forEach((workingHour) => {
            if (workingHour.date === todaysDate.toISOString().split('T')[0]) {
              const student = studentList.find(
                (student) => student.id == workingHour.studentId
              );
              let firstname: string = '';
              let lastname: string = '';
              if (student) {
                firstname = student.firstname;
                lastname = student.lastname;
              }
              workingHourList.push({
                ...workingHour,
                firstname,
                lastname,
              });

              studentNumber = res.reduce((previousValue, currentValue) => {
                if (
                  !studentIdList.includes(currentValue.studentId) &&
                  workingHour.date === todaysDate.toISOString().split('T')[0]
                ) {
                  studentIdList.push(currentValue.studentId);
                  previousValue++;
                }
                return previousValue;
              }, 0);
              studentIdList.length = 0;
            }
          });

          const dayPlanning = {
            date: todaysDate.toISOString().split('T')[0],
            studentNumber,
            workingHourList,
          };
          return dayPlanning;
        });

        this.weeklyPlanning.next(weeklyPlanning);
      })
      .catch((err) => {
        this.loggerService.error(
          'An error occurred while loading data.',
          false
        );
      });
  }

  async getStudentPlanning() {
    let studentPlanningList: any[] = [];
    let studentList: Student[] = [];
    this.userService.getList().then((res) => {
      studentList = res;
      studentList.forEach(async (student) => {
        await lastValueFrom(
          this.http.get<WorkingHourRange[]>(
            `${environment.JSON_SERVER_URL}/students/${student.id}/working_hour_range?_limit=7`
          )
        )
          .then((res) => {
            studentPlanningList.push({
              student: student,
              workingHourList: res,
            });
            this.studentPlanning.next(studentPlanningList);
          })
          .catch((err) => {
            this.loggerService.error(
              'An error occurred while loading data.',
              false
            );
          });
      });
    });
  }
}
