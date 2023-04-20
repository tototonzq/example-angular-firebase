import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import {
  CloseSidebar,
  OpenSidebar,
} from 'src/app/layout/store/actions/toggle-sidebar.action';
import { LayoutSelectors } from 'src/app/layout/store/selectors/layout.selector';

@Component({
  selector: 'app-vertical',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss'],
})
export class VerticalComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  /*                                   select                                   */
  /* -------------------------------------------------------------------------- */
  @Select(LayoutSelectors.isOpen) isOpen$!: Observable<boolean>;

  /* -------------------------------------------------------------------------- */
  /*                                 unsubscribe                                */
  /* -------------------------------------------------------------------------- */
  _destroy$ = new Subject<void>();
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private store: Store) {}

  /* -------------------------------------------------------------------------- */
  /*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
  ngOnInit(): void {}

  /* -------------------------------------------------------------------------- */
  /*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  _sidebarOpen: boolean = true;

  /* -------------------------------------------------------------------------- */
  /*                                  functions                                 */
  /* -------------------------------------------------------------------------- */
  onToggleSidebar(): void {
    const toggle = this.store.selectSnapshot(LayoutSelectors.isOpen);
    if (toggle) {
      this.store.dispatch(new CloseSidebar());
    } else {
      this.store.dispatch(new OpenSidebar());
    }
  }
}
