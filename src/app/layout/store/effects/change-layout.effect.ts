import { Injectable } from '@angular/core';
import { StateContext } from '@ngxs/store';
import { LayoutStateModel } from '../models/state.model';
import { ChangeLayout } from '../actions/change-layout.action';

@Injectable({ providedIn: 'root' })
export class ChangeLayoutEffect {
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor() {}

  changeLayout(
    { patchState }: StateContext<LayoutStateModel>,
    { payload }: ChangeLayout
  ) {
    patchState({
      layout: payload.layout,
    });
  }
}
