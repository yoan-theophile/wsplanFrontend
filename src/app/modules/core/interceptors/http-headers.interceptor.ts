import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // * On spécifie des headers s'il y en a nécessite car certaines api en ont besoin pour
    // * authentifier le consommer de l'API
    const headers = request.headers
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Headers', 'Content-Type')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');

    const req = request.clone({ headers });

    // Delay is used just to wait 0.5 second
    return next.handle(req).pipe(delay(500));

    // req = req.clone({
    //   setHeaders: {
    //     'x-rapidapi-key': 'qwertyuiop;lkjhgfdsazxcvbnm',
    //     'x-rapidapi-host': 'zxcvbnml;lkjhgfdsaqwertyuiop[',
    //   },
    //   setParams: {
    //       key: '123456790987654321'
    //   }
    // });

    // return next.handle(request);
  }
}
