import { Action, State, StateContext } from '@ngxs/store';
import { SignInStateModel } from './models/sign-in.state';
import { Injectable } from '@angular/core';
import { SignInEffect } from './effects/sign-in.effect';
import { SignIn, SignInFailed, SignInSuccess } from './actions/sign-in.action';
import { ClearEffect } from './effects/clear.effect';
import { Clear } from './actions/clear.action';

const initialState: SignInStateModel = {
  loading: false,
  login_status: false,
  role: null,
};

@State<SignInStateModel>({
  name: 'signIn',
  defaults: initialState,
})
@Injectable()
export class SignInState {
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private _signInEffect: SignInEffect,
    private _clearEffect: ClearEffect
  ) {}

  /* -------------------------------------------------------------------------- */
  /*                                Sign-In State                               */
  /* -------------------------------------------------------------------------- */
  @Action(SignIn)
  SignIn(ctx: StateContext<SignInStateModel>, action: SignIn) {
    return this._signInEffect.SignIn(ctx, action);
  }

  @Action(SignInSuccess)
  SignInSuccess(ctx: StateContext<SignInStateModel>) {
    return this._signInEffect.signSuccess(ctx);
  }

  @Action(SignInFailed)
  SignInFailed(ctx: StateContext<SignInStateModel>) {
    return this._signInEffect.signFailed(ctx);
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Clear State                                */
  /* -------------------------------------------------------------------------- */
  @Action(Clear)
  Clear(ctx: StateContext<SignInStateModel>) {
    return this._clearEffect.Clear(ctx);
  }
}
