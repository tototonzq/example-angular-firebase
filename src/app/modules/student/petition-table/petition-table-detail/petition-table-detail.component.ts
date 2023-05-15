import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { DropdownRole } from 'src/app/modules/admin/manager/store/models/manager.model';
import { AdminService } from 'src/app/shared/services/admin.service';
import { PetitionService } from 'src/app/shared/services/petition.service';
import { StudentService } from 'src/app/shared/services/student.service';
import Swal from 'sweetalert2';
import { MENU_DROPDOWN_PREFIX_STUDENT } from '../../manager-petition/manager-petition.data';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-petition-table-detail',
  templateUrl: './petition-table-detail.component.html',
  styleUrls: ['./petition-table-detail.component.css'],
})
export class PetitionTableDetailComponent implements OnInit {
  /* -------------------------------------------------------------------------- */
  //*                                 unsubscribe                                */
  /* -------------------------------------------------------------------------- */
  _destroy$ = new Subject<void>();
  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private _petitionService: PetitionService) {}
  /* -------------------------------------------------------------------------- */
  //*                                  var$data                                  */
  /* -------------------------------------------------------------------------- */
  public round_petition$ = new BehaviorSubject<any[]>([]);
  public data_petition$ = new BehaviorSubject<any[]>([]);

  /* -------------------------------------------------------------------------- */
  //*                                 Life Circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    // console.log(id);
    this._petitionService.DoGetAllPetitionWithID().subscribe((res) => {
      // console.log(res);
      const data: any = res.filter((item) => item.id == id);
      console.log(...data);
      this.form.patchValue({
        ...data[0],
      });
      this.form.get('prefix')?.disable();
      this.form.get('name')?.disable();
      this.form.get('surname')?.disable();
      this.form.get('student_code')?.disable();
      this.form.get('year')?.disable();
      this.form.get('major')?.disable();
      this.form.get('phone_number')?.disable();
      this.form.get('address')?.disable();
      this.form.get('address_details')?.disable();
      this.form.get('email')?.disable();
      this.form.get('company')?.disable();
      this.form.get('company_details')?.disable();
      this.form.get('position_company')?.disable();
      this.form.get('phone_company')?.disable();
      this.form.get('fax_company')?.disable();
      this.form.get('work_details')?.disable();
      this.form.get('register_next_semester')?.disable();
      this.form.get('delivery_of_documents')?.disable();
    });
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
    position_company: new FormControl('', [Validators.required]),
    phone_company: new FormControl('', [Validators.required]),
    fax_company: new FormControl('', [Validators.required]),
    work_details: new FormControl('', [Validators.required]),
    register_next_semester: new FormControl('', [Validators.required]),
    delivery_of_documents: new FormControl('', [Validators.required]),
    // TODO : IsActive Petition
    round_petition: new FormControl('', [Validators.required]),
    is_approved_report: new FormControl(false),
    is_approved_company: new FormControl(false),
    is_approved_cancel: new FormControl(false),
    is_approved_success: new FormControl(false),
    is_approved_admin_report: new FormControl(false),
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
