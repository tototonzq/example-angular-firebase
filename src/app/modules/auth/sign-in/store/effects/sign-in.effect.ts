import { Injectable } from '@angular/core';
import { StateContext } from '@ngxs/store';
import { SignInStateModel } from '../models/sign-in.state';

@Injectable({ providedIn: 'root' })
export class SignInEffect {
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor() {}

  SignIn({ patchState }: StateContext<SignInStateModel>, { payload }: any) {
    console.log('1');
    console.log(payload);
  }
}
