import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { LayoutSelectors } from '../../store/selectors/layout.selector';
import { Observable, Subject, take } from 'rxjs';
import { RoleType } from 'src/app/shared/types/role.type';
import { Layout } from '../../store/models/layout.model';
import { UserDataModelResponse } from 'src/app/modules/auth/sign-in/store/models/sign-in.interface.model';
import { SignInSelectors } from 'src/app/modules/auth/sign-in/store/selectors/sign-in.selectors';
import { MenuItem } from './store/models/sidebar.interface';
import { MENU_LIST_DATA } from './sidebar.data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  //*                                 unsubscribe                                */
  /* -------------------------------------------------------------------------- */
  _destroy$ = new Subject<void>();

  /* -------------------------------------------------------------------------- */
  //*                                    Input                                   */
  /* -------------------------------------------------------------------------- */
  @Input() isOpen: boolean = true;

  /* -------------------------------------------------------------------------- */
  //*                                   Select                                   */
  /* -------------------------------------------------------------------------- */
  @Select(LayoutSelectors.role) role$!: Observable<RoleType>;
  @Select(LayoutSelectors.layout) layout$!: Observable<Layout>;
  @Select(SignInSelectors.getDataUserLogin) getDataUserLogin$!: Observable<
    UserDataModelResponse | null | any
  >;
  /* -------------------------------------------------------------------------- */
  //*                                  Variable                                  */
  /* -------------------------------------------------------------------------- */
  public data: any = JSON.parse(localStorage.getItem('userData') || '[]');
  public isCheckedStatusSignOut: boolean = false;

  /* -------------------------------------------------------------------------- */
  //*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private router: Router) {}

  /* -------------------------------------------------------------------------- */
  //*                                 Life Circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    this.getDataUserLogin$.subscribe((response) => {
      if (response === null) return;

      //* Save the updated data to localStorage
      this.data.push(...response);
      localStorage.setItem('userData', JSON.stringify(this.data));
    });
  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    //TODO : Remove the data from localStorage
    localStorage.removeItem('userData');
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */
  click(item?: any) {
    this.router.navigate([item]);
  }

  exit(): void {
    // TODO : remove the data from localStorage
    localStorage.removeItem('userData');
    localStorage.removeItem('userDataAdminDashboard');

    // TODO : router
    this.isCheckedStatusSignOut = true;
    setTimeout(() => {
      this.router.navigate(['sign-in']);
      this.isCheckedStatusSignOut = false;
    }, 1000);
  }

  getRole(role: string) {
    const _role = role;
    if (_role === 'admin') {
      return 'ผู้ดูแลระบบ';
    }
    if (_role === 'teacher') {
      return 'อาจารย์';
    }
    if (_role === 'student') {
      return 'นิสิต';
    }
    return;
  }

  menu: MenuItem[] = MENU_LIST_DATA;
}
