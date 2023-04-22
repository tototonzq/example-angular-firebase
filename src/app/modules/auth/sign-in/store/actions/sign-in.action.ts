/* -------------------------------------------------------------------------- */
/*                                   Sign In                                  */
/* -------------------------------------------------------------------------- */
export class SignIn {
  static readonly type = '[ Auth ] SignIn';
  constructor(public user: string, public password: string) {}
}
