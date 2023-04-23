import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MENU_DROPDOWN_MANAGER_ADMIN } from '../manager.data';
import { DropdownRole } from '../store/models/manager.model';
import { Select, Store } from '@ngxs/store';
import { FormControl, Validators } from '@angular/forms';
import { Find } from '../store/actions/find-manager.action';
import { ManagerSelector } from '../store/selectors/manager.selectors';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.css'],
})
export class ManagerListComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  //*                                   select                                   */
  /* -------------------------------------------------------------------------- */
  @Select(ManagerSelector.data) data$!: Observable<unknown[] | any>;
  // @Select(SignInSelectors.getData) data!: Observable<any>;
  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store
  ) {}

  /* -------------------------------------------------------------------------- */
  //*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    this.GetAll();
  }
  ngOnDestroy(): void {}
  /* -------------------------------------------------------------------------- */
  //*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  user = new FormControl('', [Validators.required]);
  role = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);
  major = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  code = new FormControl('', [Validators.required]);
  group = new FormControl('', [Validators.required]);

  /* -------------------------------------------------------------------------- */
  /*                                    logic                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                               logic function                               */
  /* -------------------------------------------------------------------------- */
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
  Add(username: string | null | any): void {
    const data: any = {
      role: this.role.value,
      code: this.code.value,
      username: this.username.value,
      password: '123456789',
      user: this.user.value,
      group: this.group.value,
      major: this.major.value,
    };
    this.firestore
      .collection('users')
      .doc(username)
      .set(data)
      .then((res) => {
        console.log(res);
      });
  }

  GetAll(): void {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((values) => {
        // console.log(values);
        this.store.dispatch(new Find(values));
        values;
      });
  }
  /* -------------------------------------------------------------------------- */
  /*                               Local Database                               */
  /* -------------------------------------------------------------------------- */
  dropdown: DropdownRole[] = MENU_DROPDOWN_MANAGER_ADMIN;
}