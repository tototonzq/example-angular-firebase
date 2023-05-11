import { Injectable } from '@angular/core';
import { SignInStateModel } from '../models/sign-in.state.model';
import { StateContext } from '@ngxs/store';
import { SignInPayload } from '../models/sign-in.payload.model';
import { SignInWithAdmin } from '../actions/sign-in.action';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

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
      loading_button: true,
    });
    // console.log(payload);
    // TODO: If username or password is empty
    if (payload.username === '' || payload.password === '') {
      setTimeout(() => {
        // alert('Please enter username and password');
        Swal.fire({
          position: 'center',
          icon: 'question',
          title: `กรุณาใส่ชื่อผู้ใช้และรหัสผ่าน !`,
          showConfirmButton: false,
          timer: 1500,
        });
        patchState({
          loading: false,
          loading_button: false,
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
    //! TODO : If username found
    if (data.length !== 0) {
      if (data[0].password === payload.password) {
        console.log(data[0]);
        // console.log(data[0].password);
        // console.log(payload.password);
        setTimeout(() => {
          // alert('User Login Successfully');
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `ยินดีต้อนรับ ${data[0].user}`,
            showConfirmButton: false,
            timer: 1200,
          });

          patchState({
            loading: false,
            login_status: true,
            data_user_login: data,
            loading_button: false,
            role: data[0].role,
          });
          // TODO : If role is admin
          if (data[0].role === 'admin') {
            dispatch(new SignInWithAdmin());
          }
        }, 2000);
        return;
      } else {
        patchState({
          loading: false,
          loading_button: false,
        });
        // return alert('Password is incorrect');
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `รหัสผ่านไม่ถูกต้อง !`,
          showConfirmButton: false,
          timer: 1200,
        });
      }
    }

    // TODO : If username not found
    else if (data.length === 0) {
      setTimeout(() => {
        // alert('User not found');
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `ไม่พบผู้ใช้ !`,
          showConfirmButton: false,
          timer: 1200,
        });
        patchState({
          loading: false,
          loading_button: false,
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
