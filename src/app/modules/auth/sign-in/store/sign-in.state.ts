import { Action, State, StateContext } from '@ngxs/store';
import { SignInStateModel } from './models/sign-in.state';
import { Injectable } from '@angular/core';
import { SignInEffect } from './effects/sign-in.effect';
import { SignIn } from './actions/sign-in.action';

const initialState: SignInStateModel = {};

@State<SignInStateModel>({
  name: 'signIn',
  defaults: initialState,
})
@Injectable()
export class SignInState {
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private _signInEffect: SignInEffect) {}

  /* -------------------------------------------------------------------------- */
  /*                                Sign-In State                               */
  /* -------------------------------------------------------------------------- */
  @Action(SignIn)
  SignIn(ctx: StateContext<SignInStateModel>, action: SignIn) {
    return this._signInEffect.SignIn(ctx, action);
  }
}
