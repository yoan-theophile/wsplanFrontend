import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserRoleType } from '../model';
import { AlertService } from './alert.service';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private alertService: AlertService) {}

  async getList() {
    let studentList: User[] = [];
    await lastValueFrom(
      this.http
        .get<User[]>(`${environment.JSON_SERVER_URL}/students`)
        .pipe(delay(500))
    )
      .then((res) => {
        studentList = res;
      })
      .catch((err) => {
        this.alertService.error('An error occurred while loading data.', {
          autoClose: false,
        });
      });
    return studentList;
  }

  async register(user: User) {
    // reset alerts on submit
    this.alertService.clear();
    await this.getList()
      .then(async (users) => {
        const existingUser = users.find((x) => x.email === user.email);
        if (existingUser) {
          this.alertService.error(
            `Email ${existingUser.email} is already taken`
          );
        } else {
          await lastValueFrom(
            this.http
              .post<User>(`${environment.JSON_SERVER_URL}/students`, user)
              .pipe(delay(500))
          )
            .then(() => {
              this.alertService.success('Successful registration', {
                autoClose: false,
                keepAfterRouteChange: true,
              });
            })
            .catch((err) => {
              this.alertService.error('An error occurred during registration');
            });
        }
      })
      .catch((err) => {
        this.alertService.error('An error occurred during registration');
        console.log(err);
      });
  }
}
