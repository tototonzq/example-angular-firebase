import { Injectable } from '@angular/core';
import { StateContext } from '@ngxs/store';

@Injectable({ providedIn: 'root' })
export class ClearEffect {
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor() {}

  Clear({ patchState, dispatch }: StateContext<any>) {
    console.log('Clear Effect');

    patchState({
      login_status: false,
      loading: false,
      role: null,
    });
  }
}
