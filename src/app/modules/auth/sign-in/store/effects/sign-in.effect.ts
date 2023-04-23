import { Injectable } from '@angular/core';
import { SignInStateModel } from '../models/sign-in.state.model';
import { StateContext } from '@ngxs/store';
import { GetAllUserService } from 'src/app/shared/services/get-all-user.service.service';
import { take } from 'rxjs';
import { SignInPayload } from '../models/sign-in.payload.model';
import { SignInWithAdmin } from '../actions/sign-in.action';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SignInEffect {
  /* -------------------------------------------------------------------------- */
  //*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private _router: Router) {}

  /* -------------------------------------------------------------------------- */
  //*                                   Effects                                  */
  /* -------------------------------------------------------------------------- */
  signIn(
    { patchState, dispatch, getState }: StateContext<SignInStateModel>,
    { payload }: SignInPayload | null | any
  ) {
    patchState({
      loading: true,
    });
    // console.log(payload);
    // TODO: If username or password is empty
    if (payload.username === '' || payload.password === '') {
      setTimeout(() => {
        alert('Please enter username and password');
        patchState({
          loading: false,
        });
      }, 2000);
      return;
    }

    // TODO : Find user by username and password
    const data: string | null | any = getState().data_user_all.filter(
      (item: { username: string | null | any }) =>
        item.username === payload.username
    );
    // console.log(data);
    // TODO : If username found
    if (data.length !== 0) {
      setTimeout(() => {
        alert('User Login Successfully');
        patchState({
          loading: false,
          login_status: true,
          data_user_login: data,
          role: data[0].role,
        });
        // TODO : If role is admin
        if (data[0].role === 'admin') {
          dispatch(new SignInWithAdmin());
        }
      }, 2000);
      return;
    }

    // TODO : If username not found
    if (data.length === 0) {
      setTimeout(() => {
        alert('User not found');
        patchState({
          loading: false,
        });
      }, 2000);
      return;
    }
  }

  signInWithAdmin({
    patchState,
    dispatch,
    getState,
  }: StateContext<SignInStateModel>) {
    // this._router.navigate(['ad-dashboard']);
    patchState({});
  }
}
