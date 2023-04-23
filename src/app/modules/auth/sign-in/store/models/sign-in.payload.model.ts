import { UserDataModelResponse } from './sign-in.interface.model';

/* -------------------------------------------------------------------------- */
//*                                  Payloads                                  */
/* -------------------------------------------------------------------------- */

export type GetAllUsersPayload = UserDataModelResponse | null | any;
export type SignInPayload = {
  username: string | null | any;
  password: string | null | any;
};
