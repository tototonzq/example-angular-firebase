import { Injectable } from '@angular/core';
import { StateContext } from '@ngxs/store';
import { SignInStateModel } from '../models/sign-in.state.model';
import { GetAllUsers } from '../actions/get-all-user.action';

@Injectable({ providedIn: 'root' })
export class GetAllUsersEffect {
  /* -------------------------------------------------------------------------- */
  //*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor() {}

  /* -------------------------------------------------------------------------- */
  //*                                   Effects                                  */
  /* -------------------------------------------------------------------------- */
  getAllUsers(
    { patchState, dispatch, getState }: StateContext<SignInStateModel>,
    { payload }: GetAllUsers
  ) {
    console.log(payload);
    patchState({
      data_user_all: payload,
      count_user_all: payload.length,
    });
  }
}
