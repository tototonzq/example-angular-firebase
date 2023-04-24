import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReturnPageNotFoundPayload } from './store/models/not-found.payload.model';
import { Router } from '@angular/router';

@Component({
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  //*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private _router: Router) {}

  /* -------------------------------------------------------------------------- */
  //*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  public remaining: number | null | any = 10;
  public intervalId: null | any;
  /* -------------------------------------------------------------------------- */
  //*                                 Life Circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    // TODO : Countdown page return !
    this.intervalId = setInterval(() => {
      this.remaining--;
      // console.log(this.remaining);
      if (this.remaining === 1) {
        clearInterval(this.intervalId);
        this._router.navigate(['/sign-in']);
      } else return;
    }, 1000);
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
