import { ManagerState } from '../manager.stete';
import { Selector } from '@ngxs/store';
import { ManagerStateModel } from '../models/manager.state';

export class ManagerSelector {
  /* -------------------------------------------------------------------------- */
  /*                                  Selector                                  */
  /* -------------------------------------------------------------------------- */
  @Selector([ManagerState])
  static data(state: ManagerStateModel) {
    return state.data_user;
  }
}
