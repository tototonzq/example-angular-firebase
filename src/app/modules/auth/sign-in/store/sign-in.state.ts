import { Action, State, StateContext } from '@ngxs/store';
import { SignInStateModel } from './models/sign-in.state.model';
import { Injectable } from '@angular/core';
import { SignInEffect } from './effects/sign-in.effect';
import { SignIn, SignInWithAdmin } from './actions/sign-in.action';
import { LeavePageEffect } from './effects/leave-page.effect';
import { GetAllUsers } from './actions/get-all-user.action';
import { GetAllUsersEffect } from './effects/get-all-user.effect';
import { LeavePage } from './actions/leave-page.action';

const initialState: SignInStateModel = {
  // TODO : status user
  role: null,

  // TODO : status
  loading: false,
  login_status: false,

  // TODO : status data
  data_user_all: null,
  count_user_all: null,
  data_user_login: null,
};

@State<SignInStateModel>({
  name: 'signIn',
  defaults: initialState,
})
@Injectable()
export class SignInState {
  /* -------------------------------------------------------------------------- */
  //*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private _signInEffect: SignInEffect,
    private _leavePageEffect: LeavePageEffect,
    private _getAllUsersEffect: GetAllUsersEffect
  ) {}

  /* -------------------------------------------------------------------------- */
  //*                                Sign-In State                               */
  /* -------------------------------------------------------------------------- */
  @Action(SignIn)
  SignIn(ctx: StateContext<SignInStateModel>, action: SignIn) {
    return this._signInEffect.signIn(ctx, action);
  }

  @Action(SignInWithAdmin)
  SignInWithAdmin(ctx: StateContext<SignInStateModel>) {
    return this._signInEffect.signInWithAdmin(ctx);
  }

  /* -------------------------------------------------------------------------- */
  //*                              Leave-Page State                              */
  /* -------------------------------------------------------------------------- */
  @Action(LeavePage)
  Clear(ctx: StateContext<SignInStateModel>) {
    return this._leavePageEffect.leavePage(ctx);
  }

  /* -------------------------------------------------------------------------- */
  //*                             Get-All Users State                            */
  /* -------------------------------------------------------------------------- */
  @Action(GetAllUsers)
  GetAllUsers(ctx: StateContext<SignInStateModel>, action: any) {
    return this._getAllUsersEffect.getAllUsers(ctx, action);
  }
}
