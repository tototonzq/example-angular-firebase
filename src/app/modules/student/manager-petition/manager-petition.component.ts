import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownRole } from '../../admin/manager/store/models/manager.model';
import { MENU_DROPDOWN_PREFIX_STUDENT } from './manager-petition.data';
import { BehaviorSubject, Subject } from 'rxjs';
import { StudentService } from 'src/app/shared/services/student.service';
import { AdminService } from 'src/app/shared/services/admin.service';

//! import Alert SweetAlert
import Swal from 'sweetalert2';
import { PetitionService } from 'src/app/shared/services/petition.service';

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
    private _adminService: AdminService,
    private _petitionService: PetitionService
  ) {}
  /* -------------------------------------------------------------------------- */
  //*                                  var$data                                  */
  /* -------------------------------------------------------------------------- */
  public round_petition$ = new BehaviorSubject<any[]>([]);
  public data_petition$ = new BehaviorSubject<any[]>([]);
  private major: string = '';

  /* -------------------------------------------------------------------------- */
  //*                                 Life Circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      // console.log(value);
    });
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
        this._petitionService
          .getAllPetitionWithUsername(
            JSON.parse(localStorage.getItem('userData') || '[]')[0].username
          )
          .subscribe((res) => {
            console.log(res);

            this.data_petition$.next(
              res.filter(
                (x: any) =>
                  x.authorization ===
                  JSON.parse(localStorage.getItem('userData') || '[]')[0]
                    .username
              )
            );
            // console.log(this.data_petition$.value);
          });
        // TODO : Set data round to var$
        this.round_petition$.next(res_round_petition);
      });
    // TODO : Set value form
    const localStorageHeader = JSON.parse(
      localStorage.getItem('userData') || '[]'
    )[0];
    console.log(localStorageHeader);
    this.form.get('major')?.setValue(localStorageHeader.major);
    this.form.get('student_code')?.setValue(localStorageHeader.code);
    this.form.get('name')?.setValue(localStorageHeader.name);
    this.form.get('surname')?.setValue(localStorageHeader.surname);
    this.form.get('phone_number')?.setValue(localStorageHeader.phone);
    this.form.get('year')?.setValue(localStorageHeader.year);
    this.form.get('prefix')?.setValue(localStorageHeader.prefix);
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
    prefix: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    student_code: new FormControl(''),
    year: new FormControl(''),
    major: new FormControl(''),
    phone_number: new FormControl(''),
    // address: new FormControl(''),
    // address_details: new FormControl(''),
    // email: new FormControl(''),
    company: new FormControl('', [Validators.required]),
    company_details: new FormControl('', [Validators.required]),
    position_company: new FormControl('', [Validators.required]),
    phone_company: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    work_details: new FormControl('', [Validators.required]),
    register_next_semester: new FormControl('', [Validators.required]),
    delivery_of_documents: new FormControl('', [Validators.required]),
    // TODO : IsActive Petition
    round_petition: new FormControl(''),
    is_approved_report: new FormControl(false),
    is_approved_company: new FormControl(false),
    is_approved_cancel: new FormControl(false),
    is_approved_success: new FormControl(false),
    is_approved_admin_report: new FormControl(false),
    is_approved_student_success: new FormControl(false),
    is_complete: new FormControl(false),
    url_courtesy: new FormControl(''),
    url_send: new FormControl(''),
    url_response: new FormControl(''),
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
        const username = JSON.parse(localStorage.getItem('userData') || '[]')[0]
          .username;
        const headers = { authorization: `${username}` };
        // console.log(Object.assign({}, this.form.value, headers));
        this._petitionService.createPetition(
          Object.assign({}, this.form.value, headers)
        );
      }, 1000);
      this.status_loading$.next(false);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `บันทึกข้อมูลสําเร็จ !`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    // this.form.reset({
    //   prefix: '',
    // });
  }
}
