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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Find } from '../store/actions/find-manager.action';
import { ManagerSelector } from '../store/selectors/manager.selectors';
import { Observable, Subject } from 'rxjs';
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
  /*                                unsubscribe$                                */
  /* -------------------------------------------------------------------------- */
  _destroy$ = new Subject<void>();
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
    this.form.valueChanges.subscribe(() => {
      // console.log(this.form.value);
    });

    //* Get users
    this._authUserService
      .getAllUser()
      .pipe()
      .subscribe((res) => {
        this.user_data_all = res;
        this._store.dispatch(new Find(res));
      });

    //* Get by username again
    // this.params = this._route.snapshot.queryParams['username'];
    this._route.queryParams.subscribe((params) => {
      // this.params = params['username'];
      // console.log([params].length);
      // console.log([params]);
      // console.log(params);
      // console.log(params['username']);
      if (params['username'] === undefined) {
        return this.resetForm();
      }
      // console.log(params['username'].length);

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
          this.user_data = data;
          // console.log(data);
          setTimeout(() => {
            this.form.get('username')?.disable();
            this.form.setValue(data);
            // TODO : set loading !
            this.isCheckedStatusGetByUsername = false;
            this.isCheckedStatusEditLoading = true;
          }, 1000);
        });
      }
    });
  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }
  /* -------------------------------------------------------------------------- */
  //*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  // TODO : Form Group
  form: FormGroup = new FormGroup({
    user: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    major: new FormControl('', [Validators.required]),
    password: new FormControl(''),
    code: new FormControl('', [Validators.required]),
    group: new FormControl('', [Validators.required]),
  });

  // TODO : Validate
  public isGroupValidate: boolean = false;
  public isMajorValidate: boolean = false;
  public isCodeValidate: boolean = false;
  public isUserValidate: boolean = false;
  public isPasswordValidate: boolean = false;
  public isRoleValidate: boolean = false;

  public isCheckedStatusAddLoading: boolean = false;
  public isCheckedStatusGetByUsername: boolean = false;

  public user_data: any;
  public user_data_all: any;

  public isCheckedStatusEditLoading: boolean = false;

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
  /* -------------------------------------------------------------------------- */
  //*                                     ADD                                    */
  /* -------------------------------------------------------------------------- */
  Add(item?: any): void {
    // console.log(item);
    // console.log(this.form.value);
    // console.log(this.form.invalid);
    if (this.form.invalid) {
      alert('กรุณาใส่ข้อมูลให้ครบถ้วน');
      console.log('Form is invalid!');
      return;
    }
    //* Loading Add data
    this.isCheckedStatusAddLoading = true;
    // TODO : Set Value
    const data: any = {
      role: this.form.value.role,
      code: this.form.value.code,
      username: this.form.value.username,
      password: '123456789',
      user: this.form.value.user,
      group: this.form.value.group,
      major: this.form.value.major,
    };
    this._firestore
      .collection('users')
      .doc(item)
      .set(data)
      .then((res) => {
        alert('เพิ่มข้อมูลสำเร็จ');
        this._router.navigate(['/admin-manager-table']);
      });
  }

  resetForm(): void {
    this.form.reset({
      role: '',
      code: '',
      username: '',
      password: '',
      user: '',
      group: '',
      major: '',
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
