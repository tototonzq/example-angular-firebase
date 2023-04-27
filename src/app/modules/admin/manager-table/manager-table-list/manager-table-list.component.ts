import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Find } from '../../manager/store/actions/find-manager.action';
import { Observable, Subject } from 'rxjs';
import { ManagerSelector } from '../../manager/store/selectors/manager.selectors';
import { SignInSelectors } from 'src/app/modules/auth/sign-in/store/selectors/sign-in.selectors';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthUserService } from 'src/app/shared/services/auth/auth-user.service';
import { ManagerListComponent } from '../../manager/manager-list/manager-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-table-list',
  templateUrl: './manager-table-list.component.html',
  styleUrls: ['./manager-table-list.component.css'],
})
export class ManagerTableListComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  //*                                 unsubscribe                                */
  /* -------------------------------------------------------------------------- */
  _destroy$ = new Subject<void>();

  /* -------------------------------------------------------------------------- */
  //*                                   Select                                   */
  /* -------------------------------------------------------------------------- */
  @Select(ManagerSelector.data) data$!: Observable<unknown[] | any>;
  @Select(SignInSelectors.getCountUserAll) getCountUserAll$!: Observable<
    number | any
  >;

  /* -------------------------------------------------------------------------- */
  //*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private _store: Store,
    private _auth: AngularFireAuth,
    private _firestore: AngularFirestore,
    private _authUserService: AuthUserService,
    private _router: Router
  ) {}

  /* -------------------------------------------------------------------------- */
  //*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  public isCheckedStatusGetAllUsers: boolean = false;
  public isCheckedStatusDelete: boolean = false;
  /* -------------------------------------------------------------------------- */
  //*                                 Life Circle                                */
  /* -------------------------------------------------------------------------- */
  // TODO : OnInit
  ngOnInit() {
    // ! Injector Users
    this._authUserService
      .getAllUser()
      .pipe()
      .subscribe((res) => {
        // console.log(res);
        if (res!.length > 0) {
          this._store.dispatch(new Find(res));
          this.isCheckedStatusGetAllUsers = true;
        } else return;
      });
  }
  // TODO : OnDestroy
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  /* -------------------------------------------------------------------------- */
  //*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */
  // TODO : get role required
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

  // TODO : delete users with username
  delete(item: any): void {
    // console.log(item);
    this.isCheckedStatusDelete = true;
    setTimeout(() => {
      this.isCheckedStatusDelete = false;
      this._authUserService.delete(item);
    }, 1000);
  }

  detail(item: any): void {
    this._router.navigate(['/admin-manager'], {
      queryParams: {
        username: item.username,
      },
    });
  }
}
