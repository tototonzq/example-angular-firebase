import { Injectable } from '@angular/core';
import { LayoutStateModel } from './models/state.model';
import { Action, State, StateContext } from '@ngxs/store';
import { CloseSidebar, OpenSidebar } from './actions/toggle-sidebar.action';
import { ToggleSidebarEffect } from './effects/toggle-sidebar.effect';
import { ChangeRole } from './actions/change-role.action';
import { ChangeRoleEffect } from './effects/change-role.effect';
import { Layout } from './models/layout.model';
import { ChangeLayoutEffect } from './effects/change-layout.effect';
import { ChangeLayout } from './actions/change-layout.action';

const initialState: LayoutStateModel = {
  sidebar_open: true,
  role: 'student',
  layout: Layout.EMPTY,
};

@State<LayoutStateModel>({
  name: 'layout',
  defaults: initialState,
})
@Injectable()
export class LayoutState {
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private _toggleSidebarEffect: ToggleSidebarEffect,
    private _changeRoleEffect: ChangeRoleEffect,
    private _changeLayoutEffect: ChangeLayoutEffect
  ) {}

  /* -------------------------------------------------------------------------- */
  /*                               Toggle Sidebar                               */
  /* -------------------------------------------------------------------------- */
  @Action(OpenSidebar)
  openSidebar(ctx: StateContext<LayoutStateModel>) {
    return this._toggleSidebarEffect.openSidebar(ctx);
  }

  @Action(CloseSidebar)
  closeSidebar(ctx: StateContext<LayoutStateModel>) {
    return this._toggleSidebarEffect.closeSidebar(ctx);
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Change Role                                */
  /* -------------------------------------------------------------------------- */
  @Action(ChangeRole)
  changeRole(ctx: StateContext<LayoutStateModel>, acton: ChangeRole) {
    return this._changeRoleEffect.changeRole(ctx, acton);
  }

  /* -------------------------------------------------------------------------- */
  /*                                Change Layout                               */
  /* -------------------------------------------------------------------------- */
  @Action(ChangeLayout)
  changeLayout(ctx: StateContext<LayoutStateModel>, action: ChangeLayout) {
    return this._changeLayoutEffect.changeLayout(ctx, action);
  }
}
