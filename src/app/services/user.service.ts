import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${appConfig.apiUrl}/users`);
  }

  register(user: User){
    return this.http.post(`${appConfig.apiUrl}/users`, user)
  }

  delete(id: number) {
    return this.http.delete(`${appConfig.apiUrl}/users/${id}`)
  }
}
