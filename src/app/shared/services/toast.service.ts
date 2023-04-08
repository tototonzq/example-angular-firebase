import { Observable, Subject, filter } from 'rxjs';

import { Injectable } from '@angular/core';
import { Toast, ToastType } from '../component/toast/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  /* -------------------------------------------------------------------------- */
  /*                                  Variable                                  */
  /* -------------------------------------------------------------------------- */
  private subject = new Subject<Toast>();
  private defaultId = 'default-toast';

  /* -------------------------------------------------------------------------- */
  /*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor() {}

  /* -------------------------------------------------------------------------- */
  /*                   enable subscribing to alerts observable                  */
  /* -------------------------------------------------------------------------- */
  onToast(id = this.defaultId): Observable<Toast> {
    return this.subject.asObservable().pipe(filter((x) => x && x.id === id));
  }

  /* -------------------------------------------------------------------------- */
  /*                             convenience methods                            */
  /* -------------------------------------------------------------------------- */
  success(message: string, options?: Partial<Toast>) {
    options = {
      autoClose: options?.autoClose === false ? false : true,
    };
    this.toast(new Toast({ ...options, type: ToastType.Success, message }));
  }

  error(message: string, options?: Partial<Toast>) {
    options = {
      autoClose: options?.autoClose === false ? false : true,
    };
    this.toast(new Toast({ ...options, type: ToastType.Error, message }));
  }

  info(message: string, options?: Partial<Toast>) {
    options = {
      autoClose: options?.autoClose === false ? false : true,
    };
    this.toast(new Toast({ ...options, type: ToastType.Info, message }));
  }

  warn(message: string, options?: Partial<Toast>) {
    options = {
      autoClose: options?.autoClose === false ? false : true,
    };
    this.toast(new Toast({ ...options, type: ToastType.Warning, message }));
  }

  /* -------------------------------------------------------------------------- */
  /*                              main toast method                             */
  /* -------------------------------------------------------------------------- */
  toast(toast: Toast) {
    toast.id = toast.id || this.defaultId;
    this.subject.next(toast);
  }

  /* -------------------------------------------------------------------------- */
  /*                                clear alerts                                */
  /* -------------------------------------------------------------------------- */
  clear(id = this.defaultId) {
    this.subject.next(new Toast({ id }));
  }
}
