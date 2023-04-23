import { SignInPayload } from '../models/sign-in.payload.model';

/* -------------------------------------------------------------------------- */
//*                               Sign In Actions                              */
/* -------------------------------------------------------------------------- */
export class SignIn {
  static readonly type = '[ Auth ] SignIn';
  constructor(public payload: SignInPayload) {}
}

export class SignInWithAdmin {
  static readonly type = '[ Auth ] Admin SignIn';
}
