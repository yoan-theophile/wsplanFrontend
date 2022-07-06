import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const headers = req.headers
    //     .set('Content-Type', 'application/json');
    // const authReq = req.clone({ headers });
    // return next.handle(authReq);

    // * On spécifie des headers s'il y en a nécessite car certaines api en ont besoin pour 
    // * authentifier le consommer de l'API
    req = req.clone({
    //   setHeaders: {
    //     'x-rapidapi-key': 'qwertyuiop;lkjhgfdsazxcvbnm',
    //     'x-rapidapi-host': 'zxcvbnml;lkjhgfdsaqwertyuiop[',
    //   },
    //   setParams: {
    //       key: '123456790987654321'
    //   }
    });

    return next.handle(req);
  }
}
