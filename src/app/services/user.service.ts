import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  register(user: User){
    return this.http.post(`${environment.apiUrl}/users/register`, user)
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`)
  }
}
