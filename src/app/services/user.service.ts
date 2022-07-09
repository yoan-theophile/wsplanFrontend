import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'localhost:3000';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  register(user: User){
    return this.http.post(`${this.apiUrl}/users`, user)
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/users/${id}`)
  }
}
