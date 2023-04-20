import { Injectable } from '@angular/core';
import { LayoutStateModel } from '../models/state.model';
import { StateContext } from '@ngxs/store';
import { ChangeRole } from '../actions/change-role.action';

@Injectable({ providedIn: 'root' })
export class ChangeRoleEffect {
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor() {}

  changeRole(
    { patchState }: StateContext<LayoutStateModel>,
    { payload }: ChangeRole
  ) {
    patchState({ role: payload.role });
  }
}
