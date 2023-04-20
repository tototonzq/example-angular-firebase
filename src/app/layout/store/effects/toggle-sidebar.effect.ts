import { Injectable } from '@angular/core';
import { LayoutStateModel } from '../models/state.model';
import { StateContext } from '@ngxs/store';

@Injectable({ providedIn: 'root' })
export class ToggleSidebarEffect {
  constructor() {}

  openSidebar({ patchState }: StateContext<LayoutStateModel>) {
    return patchState({
      sidebar_open: true,
    });
  }

  closeSidebar({ patchState }: StateContext<LayoutStateModel>) {
    return patchState({
      sidebar_open: false,
    });
  }
}
