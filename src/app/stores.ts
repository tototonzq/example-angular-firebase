import { StateClass } from '@ngxs/store/internals';
import { LayoutState } from './layout/store/layout.state';
import { ManagerState } from './modules/admin/manager/store/manager.stete';

export const Stores: StateClass<any>[] | undefined = [
  LayoutState,
  // SignInState,
  ManagerState,
];
