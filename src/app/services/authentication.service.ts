import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../model';
import { AlertService } from './alert.service';
import { LoggerService } from './logger.service';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser$: Observable<User>;

  constructor(
    private http: HttpClient,
    private loggerService: LoggerService,
    private alertService: AlertService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  async login(email: string, password: string) {
    // reset alerts on submit
    this.alertService.clear();

    await lastValueFrom(
      this.http
        .get<User[]>(
          `${environment.JSON_SERVER_URL}/students?email=${email}&password=${password}`
        )
        .pipe(delay(500))
    )
      .then((user) => {
        if (user.length > 0) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user[0]);
          this.alertService.success('Successful Authentication', {
            autoClose: true,
          });
          return true;
        } else {
          this.alertService.error(
            'Authentication failed. Incorrect email or password'
          );
          return false;
        }
      })
      .catch((err) => {
        this.loggerService.error('An error occurred while fetching data.');
      });
  }

  logout() {
    //  remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new User());
  }
}
