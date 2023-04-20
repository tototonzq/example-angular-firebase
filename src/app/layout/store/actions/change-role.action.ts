import { ChangeRolePayload } from '../models/payload.model';

export class ChangeRole {
  static readonly type = '[ Change Role ] Change Role';
  constructor(public payload: ChangeRolePayload) {}
}
