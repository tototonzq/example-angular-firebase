import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LayoutSelectors } from 'src/app/layout/store/selectors/layout.selector';
import { RoleType } from 'src/app/shared/types/role.type';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  @Select(LayoutSelectors.layout) layout$!: Observable<RoleType>;
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private router: Router) {}
  /* -------------------------------------------------------------------------- */
  /*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {}
  /* -------------------------------------------------------------------------- */
  /*                                  functions                                 */
  /* -------------------------------------------------------------------------- */
  SignIn(email: string, password: string) {
    // this.router.navigate(['dashboard']);
    if (email === 'admin' && password === 'admin') {
      this.router.navigate(['manager']);
      console.log('admin');

    } else if (email === 'user' && password === 'user') {
      this.router.navigate(['dashboard']);
      console.log('user');

    } else if (email === 'teacher' && password === 'teacher') {
      this.router.navigate(['t-dashboard']);
      console.log('teacher');

    } else if (
      email === '' ||
      password === '' ||
      email !== ('admin' || 'user' || 'teacher') ||
      password !== ('admin' || 'user' || 'teacher')
    ) {
      alert('Please enter your email and password');
    }
  }
}
