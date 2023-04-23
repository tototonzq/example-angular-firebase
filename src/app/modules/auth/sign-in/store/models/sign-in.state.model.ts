import { UserDataModelResponse } from './sign-in.interface.model';

export interface SignInStateModel {
  // TODO : status user
  loading: boolean;

  // TODO : status auth
  login_status: boolean;
  role: string | null | any;

  // TODO : status data
  data_user_all: UserDataModelResponse | null | any;
  count_user_all: number | null | any;
  data_user_login: UserDataModelResponse | null | any;
}
