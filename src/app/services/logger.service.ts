import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor(private alertService: AlertService) {}

  error(
    message: string,
    autoClose: boolean = true,
    keepAfterRouteChange: boolean = false
  ) {
    this.alertService.error(message, { autoClose, keepAfterRouteChange });
    return throwError(() => {
      const error: any = new Error(message);
      error.timestamps = new Date();
      return error;
    });
  }

  success(
    message: string,
    autoClose: boolean = true,
    keepAfterRouteChange: boolean = false
  ) {
    this.alertService.success(message, { autoClose, keepAfterRouteChange });
  }
}
