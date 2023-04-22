import { Injectable } from '@angular/core';
import { StateContext } from '@ngxs/store';
import { ManagerStateModel } from '../models/manager.state';

@Injectable({ providedIn: 'root' })
export class FindManagerEffect {
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor() {}

  find(
    { patchState }: StateContext<ManagerStateModel>,
    { payload }: unknown[] | any
  ) {
    console.log(payload);
    patchState({
      data_user: payload,
    });
  }
}
