export class SignIn {
  static readonly type = '[ Auth ] SignIn';
  constructor(
    public email: string,
    public password: string,
    public data: any
  ) {}
}
