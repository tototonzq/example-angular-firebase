import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DATA_TABLE, MENU_DROPDOWN_MANAGER_ADMIN } from '../manager.data';
import { DropdownRole } from '../store/models/manager.model';
import { Select, Store } from '@ngxs/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Find } from '../store/actions/find-manager.action';
import { ManagerSelector } from '../store/selectors/manager.selectors';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.css'],
})
export class ManagerListComponent implements OnInit, OnDestroy {
  @Select(ManagerSelector.data) data$!: Observable<unknown[] | any>;
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store
  ) {}

  /* -------------------------------------------------------------------------- */
  /*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    this.GetAll();

    // this.auth.createUserWithEmailAndPassword
  }
  ngOnDestroy(): void {}
  /* -------------------------------------------------------------------------- */
  /*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  user = new FormControl('', [Validators.required]);
  role = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

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
    if (_role === 'user') {
      return 'นิสิต';
    }
    return;
  }
  Add(): void {
    const data: any = {
      user: this.user.value,
      password: this.password.value,
      role: this.role.value,
    };
    this.firestore.collection('users').add(data);
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
  data = DATA_TABLE;
}
