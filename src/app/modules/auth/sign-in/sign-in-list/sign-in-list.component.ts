import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, take } from 'rxjs';
import { Layout } from 'src/app/layout/store/models/layout.model';
import { LayoutSelectors } from 'src/app/layout/store/selectors/layout.selector';
import { SignIn } from '../store/actions/sign-in.action';
import { GetAllUserService } from 'src/app/shared/services/get-all-user.service.service';
import { SignInSelectors } from '../store/selectors/sign-in.selectors';
import { Clear } from '../store/actions/clear.action';

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
  @Select(SignInSelectors.isLoading) isLoading$!: Observable<boolean>;
  @Select(SignInSelectors.isLoggedIn) isLoggedIn$!: Observable<boolean>;
  @Select(SignInSelectors.getRole) role$!: Observable<any>;
  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store,
    private router: Router,
    private _getAllUserService: GetAllUserService
  ) {}

  /* -------------------------------------------------------------------------- */
  //*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  //*                                 life circle                                */
  /* -------------------------------------------------------------------------- */

  ngOnInit(): void {
    this.isLoggedIn$.pipe().subscribe((isLoggedIn) => {
      console.log(isLoggedIn);
    });
    this.role$.pipe().subscribe((role) => {
      if (role === 'admin') {
        this.router.navigate(['manager']);
      } else if (role === 'teacher') {
        this.router.navigate(['t-dashboard']);
      } else if (role === 'student') {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['sign-in']);
      }
    });
    // this._getAllUserService
    //   .GetAllUser()
    //   .pipe()
    //   .subscribe((values) => {
    //     console.log(values);
    //   });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this.store.dispatch(new Clear());
  }

  /* -------------------------------------------------------------------------- */
  //*                               logic function                               */
  /* -------------------------------------------------------------------------- */

  SignIn(email: string, password: string) {
    console.log(email, password);
    this.store.dispatch(new SignIn(email, password));
  }

  forgetPassword(): void {
    this.router.navigate(['change-password']);
  }

  // SignIn(email: string, password: string) {
  //   // this.router.navigate(['dashboard']);
  //   if (email === 'admin' && password === 'admin') {
  //     this.router.navigate(['manager']);
  //     console.log('admin');
  //   } else if (email === 'user' && password === 'user') {
  //     this.router.navigate(['dashboard']);
  //     console.log('user');
  //   } else if (email === 'teacher' && password === 'teacher') {
  //     this.router.navigate(['t-dashboard']);
  //     console.log('teacher');
  //   } else if (
  //     email === '' ||
  //     password === '' ||
  //     email !== ('admin' || 'user' || 'teacher') ||
  //     password !== ('admin' || 'user' || 'teacher')
  //   ) {
  //     alert('Please enter your email and password');
  //   }
  // }
}
