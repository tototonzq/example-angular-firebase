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
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataModelResponse } from 'src/app/modules/auth/sign-in/store/models/sign-in.interface.model';
import { SignInSelectors } from 'src/app/modules/auth/sign-in/store/selectors/sign-in.selectors';
import { AuthUserService } from 'src/app/shared/services/auth/auth-user.service';

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
    private _auth: AngularFireAuth,
    private _firestore: AngularFirestore,
    private _store: Store,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authUserService: AuthUserService
  ) {}

  /* -------------------------------------------------------------------------- */
  //*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    //* Get users
    this._authUserService
      .getAllUser()
      .pipe()
      .subscribe((res) => {
        this.user_data = res;
        this._store.dispatch(new Find(res));
      });

    //* Get by username again
    // this.params = this._route.snapshot.queryParams['username'];
    this._route.queryParams.subscribe((params) => {
      // this.params = params['username'];
      // console.log([params].length);
      // console.log([params]);
      console.log(params['username'].length);

      if (params['username'].length > 0) {
        // TODO : set loading !
        this.isCheckedStatusGetByUsername = true;
        // console.log(params);
        this._authUserService.getAllUser().subscribe((res) => {
          // console.log(res);
          // TODO : Find in responses
          const data = res.find(
            (item: any) => item.username === params['username']
          );
          // console.log(data);
          setTimeout(() => {
            this.role.setValue(data.role);
            this.username.setValue(data.username);
            this.code.setValue(data.code);
            this.group.setValue(data.group);
            this.user.setValue(data.username);
            this.major.setValue(data.major);
            // TODO : set loading !
            this.isCheckedStatusGetByUsername = false;
          }, 1000);
        });
      }
    });
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
  public isCheckedStatusGetByUsername: boolean = false;

  public user_data: any;

  public params: string | null = null;
  /* -------------------------------------------------------------------------- */
  /*                                    logic                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                               logic function                               */
  /* -------------------------------------------------------------------------- */

  detail(item: any) {
    console.log(item);
  }

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
    this._firestore
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
