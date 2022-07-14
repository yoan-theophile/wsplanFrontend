import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student, User, WorkingHourRange } from '../model';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient, private loggerService: LoggerService) {}

  getAll() {
    return this.http.get<User[]>(`${environment.API_URL}/users`);
  }

  register(user: User) {
    return this.http.post(`${environment.API_URL}/users/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.API_URL}/users/${id}`);
  }

  async getList() {
    let studentList: Student[] = [];
    await lastValueFrom(
      this.http
        .get<Student[]>(`${environment.JSON_SERVER_URL}/students`)
        .pipe(delay(500))
    )
      .then((res) => {
        studentList = res;
      })
      .catch((err) => {
        this.loggerService.error(
          'An error occurred while loading data.',
          false
        );
      });
    return studentList;
  }
}
