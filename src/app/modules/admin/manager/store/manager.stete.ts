import { Injectable } from '@angular/core';
import { ManagerStateModel } from './models/manager.state';
import { Action, State, StateContext } from '@ngxs/store';
import { FindManagerEffect } from './effects/find-manager.effect';
import { Find } from './actions/find-manager.action';

const initialState: ManagerStateModel = {
  data_user: [],
};

@State<ManagerStateModel>({
  name: 'manager',
  defaults: initialState,
})
@Injectable()
export class ManagerState {
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private _findManagerEffect: FindManagerEffect) {}

  /* -------------------------------------------------------------------------- */
  /*                                 Find State                                 */
  /* -------------------------------------------------------------------------- */
  @Action(Find)
  find(ctx: StateContext<ManagerStateModel>, action: Find) {
    return this._findManagerEffect.find(ctx, action);
  }
}
