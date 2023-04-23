import { GetAllUsersPayload } from '../models/sign-in.payload.model';

/* -------------------------------------------------------------------------- */
//*                           Get All Users Actions                            */
/* -------------------------------------------------------------------------- */
export class GetAllUsers {
  static readonly type = '[ Auth ] Get User All';
  constructor(public payload: GetAllUsersPayload) {}
}
