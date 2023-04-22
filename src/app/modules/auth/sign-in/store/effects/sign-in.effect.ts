import { Injectable } from '@angular/core';
import { SignInStateModel } from '../models/sign-in.state';
import { StateContext } from '@ngxs/store';

@Injectable({ providedIn: 'root' })
export class SignInEffect {
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor() {}

  SignIn(
    { patchState }: StateContext<SignInStateModel>,
    { email, password, data }: any
  ) {
    const userLogin: any = data.fin
    console.log(email);
    console.log(password);
    console.log(data);

    patchState({});
  }
}
