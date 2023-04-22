/* -------------------------------------------------------------------------- */
/*                                Find Actions                                */
/* -------------------------------------------------------------------------- */

export class Find {
  static readonly type = '[ Manager Admin ] Find';
  constructor(public payload: unknown[] | any) {}
}
