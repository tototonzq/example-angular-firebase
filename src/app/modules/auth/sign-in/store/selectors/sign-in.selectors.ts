import { Select, Selector } from '@ngxs/store';
import { SignInState } from '../sign-in.state';
import { SignInStateModel } from '../models/sign-in.state.model';

export class SignInSelectors {
  /* -------------------------------------------------------------------------- */
  //*                            Status Data User All                            */
  /* -------------------------------------------------------------------------- */

  @Selector([SignInState])
  static getCountUserAll(state: SignInStateModel) {
    return state.count_user_all;
  }

  @Selector([SignInState])
  static getDataUserAll(state: SignInStateModel) {
    return state.data_user_all;
  }

  @Selector([SignInState])
  static getDataUserLogin(state: SignInStateModel) {
    return state.data_user_login;
  }

  /* -------------------------------------------------------------------------- */
  //*                                   Status                                   */
  /* -------------------------------------------------------------------------- */
  @Selector([SignInState])
  static getLoginStatus(state: SignInStateModel) {
    return state.login_status;
  }

  @Selector([SignInState])
  static getLoading(state: SignInStateModel) {
    return state.loading;
  }

  /* -------------------------------------------------------------------------- */
  //*                                 Status Auth                                */
  /* -------------------------------------------------------------------------- */
  @Selector([SignInState])
  static getRoleStatus(state: SignInStateModel) {
    return state.role;
  }
}
