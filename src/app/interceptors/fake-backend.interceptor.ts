import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, pipe, throwError } from 'rxjs';
import { materialize, dematerialize, delay, mergeMap } from 'rxjs/operators';

// array in local storage for registered users
let users: any[] = JSON.parse(localStorage.getItem('users') || '[]');

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // Wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();

        case url.endsWith('/users/register') && method === 'POST':
          return register();

        case url.endsWith('/users') && method === 'GET':
          return getUsers();

        case url.match(/\/users\/\d+$/) && method === 'DELETE':
          return deleteUser();

        default:
          return next.handle(request);
      }
    }

    //* route functions

    function authenticate() {
      const { email, password } = body;
      const user = users.find(
        (x) => x.email === email && x.password === password
      );
      if (!user) return error('Email or password is incorrect');
      return ok({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: 'fake-jwt-token',
      });
    }


    function register() {
        const user = body;

        if (users.find(x => x.email === user.email)) {
            return error(`Email ${user.email} is already taken`);
        }

        user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        return ok();
    }


    function getUsers() {
        if(!isLoggedIn()) return unauthorized();
        return ok();
    }

    function deleteUser() {
        if(!isLoggedIn()) return unauthorized();
        
        users = users.filter(x => x.id !== idFromUrl());
        localStorage.setItem('users', JSON.stringify(users));
        return ok();
    }


    //* helper functions

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message: string) {
      return throwError(() => {
        const error: any = new Error(message);
        error.timestamps = new Date();
        return error;
      });
    }

    function unauthorized() {
      return throwError(() => {
        return throwError(() => {
          const error: any = new Error('Unauthorized');
          error.timestamps = new Date();
          error.status = 401;
          return error;
        });
      });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}
