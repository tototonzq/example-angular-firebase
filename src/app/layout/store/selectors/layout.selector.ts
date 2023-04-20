import { Selector } from '@ngxs/store';
import { LayoutState } from '../layout.state';
import { LayoutStateModel } from '../models/state.model';

export class LayoutSelectors {
  @Selector([LayoutState])
  static isOpen(state: LayoutStateModel) {
    return state.sidebar_open;
  }

  @Selector([LayoutState])
  static role(state: LayoutStateModel) {
    return state.role;
  }

  @Selector([LayoutState])
  static layout(state: LayoutStateModel) {
    return state.layout;
  }
}
