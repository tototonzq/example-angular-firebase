import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  MENU_DROPDOWN_GROUP_ADMIN,
  MENU_DROPDOWN_MAJOR_ADMIN,
  MENU_DROPDOWN_MANAGER_ADMIN,
} from '../manager.data';
import { DropdownRole } from '../store/models/manager.model';
import { Select, Store } from '@ngxs/store';
import { FormControl, Validators } from '@angular/forms';
import { Find } from '../store/actions/find-manager.action';
import { ManagerSelector } from '../store/selectors/manager.selectors';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GetAllUserService } from 'src/app/shared/services/get-all-user.service.service';
import { UserDataModelResponse } from 'src/app/modules/auth/sign-in/store/models/sign-in.interface.model';
import { SignInSelectors } from 'src/app/modules/auth/sign-in/store/selectors/sign-in.selectors';

@Component({
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.css'],
})
export class ManagerListComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  //*                                   select                                   */
  /* -------------------------------------------------------------------------- */
  @Select(ManagerSelector.data) data$!: Observable<unknown[] | any>;
  @Select(SignInSelectors.getDataUserAll)
  getDataUserAll$!: Observable<UserDataModelResponse | null>;
  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store,
    private _router: Router,
    private getAllUserService: GetAllUserService
  ) {}

  /* -------------------------------------------------------------------------- */
  //*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    this.getAllUserService
      .GetAllUser()
      .pipe()
      .subscribe((res) => {
        this.user_data = res;
        this.store.dispatch(new Find(res));
      });

    // this.major.valueChanges.subscribe((res) => {
    //   // console.log(res);
    //   if (res!.length >= 0) {
    //     this.isMajorValidate = false;
    //   }
    // });
    // this.group.valueChanges.subscribe((res) => {
    //   // console.log(res);
    //   if (res!.length >= 0) {
    //     this.isGroupValidate = false;
    //   }
    // });
    // this.role.valueChanges.subscribe((res) => {
    //   console.log(res);
    //   if (res!.length >= 0) {
    //     this.isRoleValidate = false;
    //   }
    // });
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

  //TODO : Validate
  public isGroupValidate: boolean = false;
  public isMajorValidate: boolean = false;
  public isCodeValidate: boolean = false;
  public isUserValidate: boolean = false;
  public isPasswordValidate: boolean = false;
  public isRoleValidate: boolean = false;

  public isChecked: boolean = false;

  public user_data: any;
  /* -------------------------------------------------------------------------- */
  /*                                    logic                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                               logic function                               */
  /* -------------------------------------------------------------------------- */
  Add(username?: string | null | any): void {

    const _group = this.group.value;
    const _major = this.major.value;
    const _role = this.role.value;
    const _code = this.code.value;
    const _user = this.user.value;
    const _username = this.username.value;

    if (!_group || !_major || !_role || !_code || !_user || !_username) {
      alert('กรุณาใส่ข้อมูลให้ครบถ้วน');
      return;
    }

    // if (!_group) {
    //   alert('กรุณาเลือกคณะ');
    // }
    // if (!_major) {
    //   alert('กรุณาเลือกสาขา');
    // }
    // if (!_role) {
    //   alert('กรุณาเลือกสิทธิ');
    // }
    // if (!_code) {
    //   alert('กรุณาใส่รหัสนิสิต');
    // }
    // if (!_user) {
    //   alert('กรุณาใส่ชื่อผู้ใช้');
    // }
    // if (!_username) {
    //   alert('กรุณาใส่ไอดี');
    // }

    // if (!major || !group || !role || !code || !user) {
    //   alert('กรุณาใส่ข้อมูลให้ครบถ้วน');
    // }
    // if (!major) {
    //   this.isMajorValidate = true;
    // }
    // if (!group) {
    //   this.isGroupValidate = true;
    // }
    // if (!role) {
    //   this.isRoleValidate = true;
    // }
    //* Loading Add
    this.isChecked = true;
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
        alert('เพิ่มข้อมูลสำเร็จ');
        this._router.navigate(['/admin-manager-table']);
      });
  }
  /* -------------------------------------------------------------------------- */
  /*                               Local Database                               */
  /* -------------------------------------------------------------------------- */
  // TODO : get role
  dropdown: DropdownRole[] = MENU_DROPDOWN_MANAGER_ADMIN;
  // TODO : get group
  dropdownGroup: any[] = MENU_DROPDOWN_GROUP_ADMIN;
  // TODO : get major
  dropdownMajor: any[] = MENU_DROPDOWN_MAJOR_ADMIN;
}
