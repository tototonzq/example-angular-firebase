import { Select, Selector } from '@ngxs/store';
import { SignInState } from '../sign-in.state';
import { SignInStateModel } from '../models/sign-in.state';

export class SignInSelectors {
  @Selector([SignInState])
  static isLoading(state: SignInStateModel) {
    return state.loading;
  }

  @Selector([SignInState])
  static isLoggedIn(state: SignInStateModel) {
    return state.login_status;
  }

  @Selector([SignInState])
  static getRole(state: SignInStateModel) {
    return state.role;
  }
}
