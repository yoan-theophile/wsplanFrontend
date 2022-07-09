import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { User } from '../model';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private apiUrl = 'localhost:3000';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   
   public get currentUserValue() : User {
     return this.currentUserSubject.value;
   }
   
   login(email: string, password: string){
    return this.http.post<any>(`${this.apiUrl}/users/authenticate`, { email, password})
      .pipe(map((user: User) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
   }

   logout() {
    //  remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new User);
   }
}
