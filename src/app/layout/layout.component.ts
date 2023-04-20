import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {
  ChangeLayoutPayload,
  ChangeRolePayload,
} from './store/models/payload.model';
import { Select, Store } from '@ngxs/store';
import { ChangeRole } from './store/actions/change-role.action';
import { ChangeLayout } from './store/actions/change-layout.action';
import { RoleType } from '../shared/types/role.type';
import { LayoutSelectors } from './store/selectors/layout.selector';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  /*                                 unsubscribe                                */
  /* -------------------------------------------------------------------------- */
  _destroy$ = new Subject<void>();

  /* -------------------------------------------------------------------------- */
  /*                                   select                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private route: ActivatedRoute, private store: Store) {}

  /* -------------------------------------------------------------------------- */
  /*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  public layout: string | null = null;

  /* -------------------------------------------------------------------------- */
  /*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const payload: ChangeLayoutPayload = {
        role: data['role'],
        layout: data['layout'],
      };

      this.store.dispatch(new ChangeRole(payload));
      this.store.dispatch(new ChangeLayout(payload));
      this.layout = data['layout'];
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
  /* -------------------------------------------------------------------------- */
  /*                                  functions                                 */
  /* -------------------------------------------------------------------------- */
}
