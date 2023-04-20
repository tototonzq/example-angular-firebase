import { ChangeLayoutPayload } from '../models/payload.model';

export class ChangeLayout {
  static readonly type = '[ Change Layout] Change Layout';
  constructor(public payload: ChangeLayoutPayload) {}
}
