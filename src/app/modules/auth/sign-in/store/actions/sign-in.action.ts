export class SignIn {
  static readonly type = '[ Auth ] SignIn';
  constructor(public email: string, public password: string) {}
}

export class SignInSuccess {
  static readonly type = '[ Auth ] SignIn Success';
}

export class SignInFailed {
  static readonly type = '[ Auth ] SignIn Failed';
}
