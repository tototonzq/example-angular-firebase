import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { SignInStateModel } from './models/sign-in.state';
import { SignInEffect } from './effects/sign-in.effect';

const initialState: SignInStateModel = {
  true: false,
};

@State<SignInStateModel>({
  name: 'sign-in',
  defaults: initialState,
})
@Injectable()
export class SignInState {
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private _signInEffect: SignInEffect) {}

  /* -------------------------------------------------------------------------- */
  /*                                SignIn State                                */
  /* -------------------------------------------------------------------------- */
  // @Action(SignIn)
  // signIn(ctx: StateContext<SignInStateModel>, action: SignIn) {
  //   return this._signInEffect.SignIn(ctx, action);
  // }
}
