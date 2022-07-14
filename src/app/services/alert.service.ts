import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType } from '../model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  // Enable subscribing to alerts observable
  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter((x) => x && x.id === id));
  }

  // main Alert method
  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
    // document.querySelector('html, body')?.animate({scrollTop: 0}, 10);
    // $('html, body').animate({ scrollTop: 0 }, 'fast');
    document.querySelector('html,body')?.scroll(0,0);
  }

  // convenience methods
  success(
    message: string,
    options?: { autoClose?: boolean; keepAfterRouteChange?: boolean }
  ) {
    this.alert(new Alert({ ...options, type: AlertType.Success, message }));
  }

  error(
    message: string,
    options?: { autoClose?: boolean; keepAfterRouteChange?: boolean }
  ) {
    this.alert(new Alert({ ...options, type: AlertType.Error, message }));
  }

  info(
    message: string,
    options?: { autoClose?: boolean; keepAfterRouteChange?: boolean }
  ) {
    this.alert(new Alert({ ...options, type: AlertType.Info, message }));
  }

  warn(
    message: string,
    options?: { autoClose?: boolean; keepAfterRouteChange?: boolean }
  ) {
    this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
  }

  // clear alerts
  clear(id = this.defaultId) {
    this.subject.next(new Alert({ id }));
  }

  constructor() {}
}
