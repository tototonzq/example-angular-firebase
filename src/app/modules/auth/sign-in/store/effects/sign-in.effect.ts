import { Injectable } from '@angular/core';
import { SignInStateModel } from '../models/sign-in.state';
import { StateContext } from '@ngxs/store';
import { GetAllUserService } from 'src/app/shared/services/get-all-user.service.service';
import { take } from 'rxjs';
import { SignInFailed, SignInSuccess } from '../actions/sign-in.action';

@Injectable({ providedIn: 'root' })
export class SignInEffect {
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private _getAllUserService: GetAllUserService) {}

  SignIn(
    { patchState, dispatch }: StateContext<SignInStateModel>,
    { email, password }: any
  ) {
    patchState({
      loading: true,
    });

    this._getAllUserService
      .GetAllUser()
      .pipe(take(1))
      .subscribe((values) => {
        for (const item of values) {
          console.log(item);
          if (item.user === email && item.password === password) {
            patchState({
              role: item.role,
            });
            dispatch(new SignInSuccess());
          } else if (item.user !== email || item.password !== password) {
            dispatch(new SignInFailed());
          }
        }
        // values.forEach((item: string | any) => {
        //   if (item.user === email && item.password === password) {
        //     dispatch(new SignInSuccess());
        //   } else if (item.user !== email || item.password !== password) {
        //     dispatch(new SignInFailed());
        //   }
        // });
      });

    // data.forEach((item: string | any) => {
    //   console.log(item.user);
    //   console.log(email);

    //   console.log(item.password);
    //   console.log(password);

    //   if (item.user === email && item.password === password) {
    //     console.log('Login Successfully');
    //     alert('Login Successfully');
    //   }

    //   // this._getAllUserService.GetAllUser();
    // });

    // console.log(data);
  }

  signSuccess({ patchState }: StateContext<SignInStateModel>) {
    console.log('Login Successfully');
    patchState({
      loading: false,
      login_status: true,
    });
  }

  signFailed({ patchState }: StateContext<SignInStateModel>) {
    console.log('Login Failed');
    patchState({
      loading: false,
    });
  }
}
