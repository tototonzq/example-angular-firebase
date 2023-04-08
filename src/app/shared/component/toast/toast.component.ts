import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Toast, ToastType } from './toast.model';

import { Subscription } from 'rxjs';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  /*                                    Input                                   */
  /* -------------------------------------------------------------------------- */
  @Input() id = 'default-toast';
  @Input() fade = true;

  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  toasts: Toast[] = [];

  /* -------------------------------------------------------------------------- */
  /*                             Reactive Variables                             */
  /* -------------------------------------------------------------------------- */
  toastSubscription!: Subscription;
  routeSubscription!: Subscription;

  /* -------------------------------------------------------------------------- */
  /*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private _toastService: ToastService,
    private _cdr: ChangeDetectorRef
  ) {}

  /* -------------------------------------------------------------------------- */
  /*                                 Life Circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit() {
    // subscribe to new toast notifications
    this.toastSubscription = this._toastService
      .onToast(this.id)
      .subscribe((toast) => {
        // clear toasts when an empty toast is received
        if (!toast.message) {
          // filter out toasts without 'keepAfterRouteChange' flag
          this.toasts = this.toasts.filter((x) => x.keepAfterRouteChange);
          this._cdr.markForCheck();

          // remove 'keepAfterRouteChange' flag on the rest
          // this.toasts.forEach(x => (x?.keepAfterRouteChange ? delete x.keepAfterRouteChange : null));
          return;
        }

        // add toast to array
        this.toasts.push(toast);
        this._cdr.markForCheck();

        // auto close toast if required
        if (toast.autoClose) {
          setTimeout(() => this.removeToast(toast), 3000);
        }
      });

    // clear toasts on location change
    // this.routeSubscription = this.router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     this._toastService.clear(this.id);
    //   }
    // });
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.toastSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }

  /* -------------------------------------------------------------------------- */
  /*                               Logic Functions                              */
  /* -------------------------------------------------------------------------- */
  removeToast(toast: Toast) {
    // check if already removed to prevent error on auto close
    if (!this.toasts.includes(toast)) return;

    if (this.fade) {
      // fade out toast
      const toastIndex = this.toasts.findIndex((x) => x === toast);
      this.toasts[toastIndex].fade = true;
      this._cdr.markForCheck();

      // remove toast after faded out
      setTimeout(() => {
        this.toasts = this.toasts.filter((x) => x !== toast);
        this._cdr.markForCheck();
      }, 250);
    } else {
      // remove toast
      this.toasts = this.toasts.filter((x) => x !== toast);
      this._cdr.markForCheck();
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                              Get Set Functions                             */
  /* -------------------------------------------------------------------------- */
  get toastType(): typeof ToastType {
    return ToastType;
  }
}
