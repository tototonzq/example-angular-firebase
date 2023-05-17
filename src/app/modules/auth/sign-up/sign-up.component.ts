import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MENU_DROPDOWN_GROUP_ADMIN,
  MENU_DROPDOWN_MAJOR_ADMIN,
  MENU_DROPDOWN_MANAGER_ADMIN,
} from '../../admin/manager/manager.data';
import Swal from 'sweetalert2';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownRole } from '../../admin/manager/store/models/manager.model';
import { BehaviorSubject } from 'rxjs';
import { MENU_DROPDOWN_PREFIX_STUDENT } from '../../student/manager-petition/manager-petition.data';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private _auth: AngularFireAuth,
    private _firestore: AngularFirestore,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  /* -------------------------------------------------------------------------- */
  //*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  form: FormGroup = new FormGroup({
    prefix: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    nameAndSurname: new FormControl('', [Validators.required]),
    user: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    role: new FormControl('student'),
    username: new FormControl(''),
    phone: new FormControl(''),
    major: new FormControl('', [Validators.required]),
    password: new FormControl('123456789'),
    code: new FormControl('', [Validators.required]),
    group: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });

  isLoadingAdd$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /* -------------------------------------------------------------------------- */
  //*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {}
  /* -------------------------------------------------------------------------- */
  //*                                  functions                                 */
  /* -------------------------------------------------------------------------- */

  Add(item?: any): void {
    this.isLoadingAdd$.next(true);
    // TODO : Set Value
    const data: any = {
      role: this.form.value.role,
      code: this.form.value.code,
      username: this.form.value.code,
      password: this.form.value.password,
      user: this.form.value.user,
      group: this.form.value.group,
      major: this.form.value.major,
      name: this.form.value.nameAndSurname,
      prefix: this.form.value.prefix,
      email: this.form.value.email,
      nameAndSurname : this.form.value.nameAndSurname,
      year : this.form.value.year,
      phone : this.form.value.phone,
      address: this.form.value.address,
    };
    console.log(this.form.value);

    if (this.form.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: `กรุณาใส่ข้อมูลให้ครบถ้วน`,
        showConfirmButton: false,
        timer: 1200,
      });
      this.isLoadingAdd$.next(false);
      return;
    }
    // //* Loading Add data
    // else
    this._firestore
      .collection('users')
      .doc(item)
      .set(data)
      .then((res) => {
        this.isLoadingAdd$.next(false);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `เพิ่มข้อมูลสำเร็จ`,
          showConfirmButton: false,
          timer: 1200,
        });
        this._router.navigate(['/sign-in']);
      });
  }
  /* -------------------------------------------------------------------------- */
  //*                                    data                                    */
  /* -------------------------------------------------------------------------- */
  // TODO : get role
  dropdown: DropdownRole[] = MENU_DROPDOWN_MANAGER_ADMIN;
  // TODO : get group
  dropdownGroup: any[] = MENU_DROPDOWN_GROUP_ADMIN;
  // TODO : get major
  dropdownMajor: any[] = MENU_DROPDOWN_MAJOR_ADMIN;

  dropdownPrefix: DropdownRole[] = MENU_DROPDOWN_PREFIX_STUDENT;
}
