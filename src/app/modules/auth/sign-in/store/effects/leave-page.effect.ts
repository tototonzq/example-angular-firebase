import { Injectable } from '@angular/core';
import { StateContext } from '@ngxs/store';

@Injectable({ providedIn: 'root' })
export class LeavePageEffect {
  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor() {}
  /* -------------------------------------------------------------------------- */
  //*                                   Effects                                  */
  /* -------------------------------------------------------------------------- */

  leavePage({ patchState, dispatch }: StateContext<any>) {
    patchState({
      login_status: false,
      loading: false,
      role: null,
    });
  }
}
