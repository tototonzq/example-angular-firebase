import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, take } from 'rxjs';
import { Layout } from 'src/app/layout/store/models/layout.model';
import { LayoutSelectors } from 'src/app/layout/store/selectors/layout.selector';
import { SignIn } from '../store/actions/sign-in.action';
import { GetAllUserService } from 'src/app/shared/services/get-all-user.service.service';
import { SignInSelectors } from '../store/selectors/sign-in.selectors';
import { GetAllUsers } from '../store/actions/get-all-user.action';
import { UserDataModelResponse } from '../store/models/sign-in.interface.model';
import { FormControl, Validators } from '@angular/forms';
import { LeavePage } from '../store/actions/leave-page.action';

@Component({
  templateUrl: './sign-in-list.component.html',
  styleUrls: ['./sign-in-list.component.css'],
})
export class SignInListComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  //*                                  unsubscribe                               */
  /* -------------------------------------------------------------------------- */
  _destroy$ = new Subject<void>();
  /* -------------------------------------------------------------------------- */
  //*                                   select                                   */
  /* -------------------------------------------------------------------------- */
  @Select(LayoutSelectors.layout) layout$!: Observable<Layout>;
  @Select(SignInSelectors.getLoginStatus) getLoginStatus$!: Observable<boolean>;
  @Select(SignInSelectors.getLoading) getLoading$!: Observable<boolean>;
  @Select(SignInSelectors.getRoleStatus) getRoleStatus$!: Observable<
    string | null
  >;
  //! New
  @Select(SignInSelectors.getDataUserAll)
  getDataUserAll$!: Observable<UserDataModelResponse | null>;
  @Select(SignInSelectors.getCountUserAll) getCountUserAll$!: Observable<
    number | any
  >;
  @Select(SignInSelectors.getDataUserLogin) getDataUserLogin$!: Observable<
    UserDataModelResponse | null | any
  >;
  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store,
    private _router: Router,
    private getAllUserService: GetAllUserService,
    private _route: ActivatedRoute
  ) {}

  /* -------------------------------------------------------------------------- */
  //*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  // * Form
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  /* -------------------------------------------------------------------------- */
  //*                                 life circle                                */
  /* -------------------------------------------------------------------------- */

  ngOnInit(): void {
    // TODO :  Get User All Data !
    this.getAllUserService
      .GetAllUser()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          // console.log(res);
          this.store.dispatch(new GetAllUsers(res));
        },
        error: (err) => {
          // console.log(err);
          alert(err.message);
        },
      });

    // TODO : Role User !
    this.getRoleStatus$.subscribe((res) => {
      if (res === null) return;
      console.log(res);
      if (res === 'admin') {
        this._router.navigate(['admin-dashboard']);
      } else if (res === 'student') {
        this._router.navigate(['student-dashboard']);
      } else if (res === 'teacher') {
        this._router.navigate(['teacher-dashboard']);
      } else {
        this._router.navigate(['sign-in']);
      }
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this.store.dispatch(new LeavePage());

    //TODO : Remove the data from localStorage
    localStorage.removeItem('userData');
  }

  /* -------------------------------------------------------------------------- */
  //*                               logic function                               */
  /* -------------------------------------------------------------------------- */

  signIn(username: string | null, password: string | null) {
    const payload = {
      username: username,
      password: password,
    };
    // console.log(username, password);
    this.store.dispatch(new SignIn(payload));
  }

  forgetPassword(): void {
    this._router.navigate(['change-password']);
  }
}