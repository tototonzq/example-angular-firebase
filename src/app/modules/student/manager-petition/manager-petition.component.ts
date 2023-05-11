import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownRole } from '../../admin/manager/store/models/manager.model';
import { MENU_DROPDOWN_PREFIX_STUDENT } from './manager-petition.data';
import { BehaviorSubject, Subject } from 'rxjs';
import { StudentService } from 'src/app/shared/services/student.service';
import { AdminService } from 'src/app/shared/services/admin.service';

//! import Alert SweetAlert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manager-petition',
  templateUrl: './manager-petition.component.html',
  styleUrls: ['./manager-petition.component.css'],
})
export class ManagerPetitionComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  //*                                 unsubscribe                                */
  /* -------------------------------------------------------------------------- */
  _destroy$ = new Subject<void>();
  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private _studentService: StudentService,
    private _adminService: AdminService
  ) {}
  /* -------------------------------------------------------------------------- */
  //*                                  var$data                                  */
  /* -------------------------------------------------------------------------- */
  public round_petition$ = new BehaviorSubject<any[]>([]);
  public data_petition$ = new BehaviorSubject<any[]>([]);

  /* -------------------------------------------------------------------------- */
  //*                                 Life Circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    // TODO : Get round petition round
    this._adminService
      .getRoundPetition()
      .subscribe((res_round_petition: any) => {
        // console.log(res_round_petition);
        this.form.patchValue({
          ...this.form.value,
          round_petition: res_round_petition.round_petition,
        });
        // TODO : Get all petition round
        // this._studentService
        //   .getAllPetitionWithUsername(
        //     JSON.parse(localStorage.getItem('userData') || '[]')[0].username
        //   )
        //   .subscribe((res) => {
        //     // console.log(res);
        //     const data_petition = res.filter(
        //       (x: { round_petition: string }) =>
        //         x.round_petition === res_round_petition.round_petition
        //     );
        //     // TODO : Set data round to var$
        //     this.data_petition$.next(data_petition);
        //     // console.log(data_petition);
        //     // console.log(data_petition.length);
        //   });
        // TODO : Set data round to var$
        this.round_petition$.next(res_round_petition);
      });
    // TODO : Set value form
    const localStorageHeader = JSON.parse(
      localStorage.getItem('userData') || '[]'
    )[0];
    console.log(localStorageHeader);
    const split = localStorageHeader.user.split(' ');
    // console.log(split[0]);
    this.form.controls['name'].setValue(split[0]);
    this.form.controls['surname'].setValue(split[1]);
    this.form.controls['student_code'].setValue(localStorageHeader.code);
    this.form.controls['year'].setValue(localStorageHeader.group);
    this.form.controls['major'].setValue(localStorageHeader.major);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  /* -------------------------------------------------------------------------- */
  //*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  // TODO : Form Group
  form = new FormGroup({
    prefix: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    student_code: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    major: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    address_details: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    company_details: new FormControl('', [Validators.required]),
    status_approved_report: new FormControl(false),
    status_approved_company: new FormControl(false),
    is_cancel: new FormControl(false),
    is_success: new FormControl(false),
    round_petition: new FormControl('', [Validators.required]),
  });

  // TODO : Dropdown
  dropdown: DropdownRole[] = MENU_DROPDOWN_PREFIX_STUDENT;

  /* -------------------------------------------------------------------------- */
  //*                                localStorage                                */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  //*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  public status_loading$ = new BehaviorSubject<boolean>(false);

  /* -------------------------------------------------------------------------- */
  //*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */
  // TODO : Covert data to text thai
  getRoundCode(item: any) {
    const _round = item.round_petition;
    if (_round === 'r1') {
      return 'ลงทะเบียนคำร้อง รอบที่ 1';
    } else if (_round === 'r2') {
      return 'ลงทะเบียนคำร้อง รอบที่ 2';
    } else if (_round === 'r3') {
      return 'ลงทะเบียนคำร้อง รอบที่ 3';
    } else {
      return 'หมดเวลาดำเนินการ'; // or any other default value that makes sense
    }
  }

  // TODO : create petition student form!
  onCreatePetition(): void {
    this.status_loading$.next(true);
    // TODO : is Validation
    console.log(this.form.value);
    if (this.form.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: `กรุณาใส่ข้อมูลให้ครบถ้วน`,
        showConfirmButton: false,
        timer: 1200,
      });
      return this.status_loading$.next(false);
    } else {
      setTimeout(() => {
        // this._studentService.createPetition(
        //   Object.assign({}, this.form.value, [
        //     JSON.parse(localStorage.getItem('userData') || '[]')[0].username,
        //   ])
        // );
      }, 1000);
      this.status_loading$.next(false);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `บันทึกข้อมูลสําเร็จ !`,
        showConfirmButton: false,
        timer: 1500,
      });
      // this.form.reset();
    }
  }
}
