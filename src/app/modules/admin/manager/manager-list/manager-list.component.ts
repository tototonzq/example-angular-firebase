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
import { Router } from '@angular/router';

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
    private store: Store,
    private _router: Router
  ) {}

  /* -------------------------------------------------------------------------- */
  //*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {}
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
        // console.log(res);
        alert('เพิ่มข้อมูลสำเร็จ');
        this._router.navigate(['/admin-manager-table']);
      });
  }
  /* -------------------------------------------------------------------------- */
  /*                               Local Database                               */
  /* -------------------------------------------------------------------------- */
  dropdown: DropdownRole[] = MENU_DROPDOWN_MANAGER_ADMIN;
}
