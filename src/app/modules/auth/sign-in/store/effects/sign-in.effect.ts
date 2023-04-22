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
    data.forEach((item: string | any) => {
      console.log(item.user);
      console.log(email);

      console.log(item.password);
      console.log(password);

      if (item.user === email && item.password === password) {
        console.log('Login Successfully');
        alert('Login Successfully');
      }
    });

    console.log(data);
    patchState({});
  }
}
