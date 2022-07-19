import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model';
import { AlertService } from './alert.service';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private alertService: AlertService
  ) {}

  async getList() {
    let studentList: User[] = [];
    await lastValueFrom(
      this.http.get<User[]>(`${environment.JSON_SERVER_URL}/students`)
    )
      .then((res) => {
        studentList = res;
      })
      .catch((err) => {
        this.alertService.error('An error occurred while loading data.');
      });
    return studentList;
  }

  async updateStudent(user: User) {
    await lastValueFrom(
      this.http.put<User>(
        `${environment.JSON_SERVER_URL}/students/${user.id}`,
        user
      )
    )
      .then((res) => {
        this.alertService.success('Student updated successfully');
      })
      .catch((err) => {
        this.alertService.error('An error occurred while updating data.');
      });
  }

  async getStudent(id: number) {
    let student: User = new User();
    await lastValueFrom(
      this.http.get<User>(`${environment.JSON_SERVER_URL}/students/${id}`)
    )
      .then((res) => {
        student = res;
      })
      .catch((err: Error) => {
        this.alertService.error('Cannot find this student');
      });
    return student;
  }

  async toggleStatus(user: User) {
    const updatedUser: User = { ...user, active: !user.active };
    await lastValueFrom(
      this.http.put(
        `${environment.JSON_SERVER_URL}/students/${user.id}`,
        updatedUser
      )
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        this.alertService.error('An error occurred while updating data.');
      });
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
            this.http.post<User>(
              `${environment.JSON_SERVER_URL}/students`,
              user
            )
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

  // getProfile() {
  // this.router.events.forEach((event) => {
  //   if (event instanceof NavigationEnd) {
  //     this.featureName = event.url.split('/')[1];
  //   }
  // });
  // return this.featureName;

  // }
}
