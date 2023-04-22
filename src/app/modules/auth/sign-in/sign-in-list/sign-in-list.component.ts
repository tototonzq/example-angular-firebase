import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Layout } from 'src/app/layout/store/models/layout.model';
import { LayoutSelectors } from 'src/app/layout/store/selectors/layout.selector';

@Component({
  templateUrl: './sign-in-list.component.html',
  styleUrls: ['./sign-in-list.component.css'],
})
export class SignInListComponent implements OnInit {
  @Select(LayoutSelectors.layout) layout$!: Observable<Layout>;

  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store,
    private router: Router
  ) {}
  /* -------------------------------------------------------------------------- */
  /*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  data: any;
  /* -------------------------------------------------------------------------- */
  /*                                 life circle                                */
  /* -------------------------------------------------------------------------- */

  ngOnInit(): void {
    this.GetAll();
  }
  /* -------------------------------------------------------------------------- */
  /*                               logic function                               */
  /* -------------------------------------------------------------------------- */
  GetAll(): void {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((values) => {
        console.log(values);
        this.data = values;
      });
  }

  SignIn(email: string, password: string) {
    console.log(email, password);
    console.log(this.data);
    // this.store.dispatch(new SignIn(email, password));
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
