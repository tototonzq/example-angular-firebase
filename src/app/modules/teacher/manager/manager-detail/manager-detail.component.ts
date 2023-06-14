import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { DropdownRole } from 'src/app/modules/admin/manager/store/models/manager.model';
import { MENU_DROPDOWN_PREFIX_STUDENT } from 'src/app/modules/student/manager-petition/manager-petition.data';
import { TypePayload } from 'src/app/shared/payload/payload.model';
import { PetitionService } from 'src/app/shared/services/petition.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manager-detail',
  templateUrl: './manager-detail.component.html',
  styleUrls: ['./manager-detail.component.css'],
})
export class ManagerDetailComponent implements OnInit {
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
  public data$ = new BehaviorSubject<any[]>([]);
  public searchFilter: string = '';
  public teacherApprove: boolean = false;

  public statusNoT$ = new BehaviorSubject<any[]>([]);

  m1: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public status = [
    {
      label: 'ความเห็นของอาจารย์ที่ปรึกษา',
      accept: '',
      status: 'pending',
      date: '',
      detail: '',
      accept2: '',
    },
    {
      label: 'จัดทำหนังสืออนุเคราะห์ เเละส่งเอกสาร',
      accept: 'นายกิตติคุณ นุผัด',
      status: 'pending',
      date: '',
      detail: '',
      accept2: 'นายกิตติคุณ นุผัด',
    },
    {
      label: 'ความเห็นของสถานประกอบการ',
      accept: '',
      status: 'pending',
      date: '',
      detail: '',
      accept2: '',
    },
    {
      label: 'ความเห็นของนิสิต',
      accept: '',
      status: 'pending',
      date: '',
      detail: '',
      accept2: '',
    },
    {
      label: 'จัดทำหนังสือส่งตัว',
      accept: 'นายกิตติคุณ นุผัด',
      status: 'pending',
      date: '',
      detail: '',
      accept2: 'ผู้ดูเเละระบบ',
    },
    {
      label: 'ดำเนินการเสร็จสิ้น',
      accept: 'นายกิตติคุณ นุผัด',
      status: 'pending',
      date: '',
      detail: '',
      accept2: 'ผู้ดูเเละระบบ',
    },
  ];

  /* -------------------------------------------------------------------------- */
  //*                                 Life Circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    // status[2].status = 'completed';
    // this.status[2].status = 'completed';
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    // console.log(id);
    this._petitionService.DoGetAllPetitionWithID().subscribe((res) => {
      console.log(res);

      this.teacherApprove = res[0].is_teacher_approve;
      //* Set Value
      this.status[0].accept = res[0].is_teacher_approve;
      this.status[3].accept = res[0].name;
      this.status[2].accept = 'นายกิตติคุณ นุผัด';
      this.status[0].status = res[0].is_approved_report;
      this.status[1].status = res[0].is_approved_admin_report;
      this.status[2].status = res[0].is_approved_company;
      this.status[3].status = res[0].is_approved_student_success;
      this.status[4].status = res[0].is_complete;
      this.status[5].status = res[0].is_complete;
      this.status[0].date =
        res[0].is_date_approve + ' ' + res[0].is_time_approve;
      this.status[0].accept2 = res[0].is_teacher_approve;
      this.status[3].accept2 = res[0].name + ' ' + res[0].surname;
      this.status[2].accept2 = 'นายกิตติคุณ นุผัด';
      this.status[1].date =
        res[0].is_admin_date_approve + ' ' + res[0].is_admin_time_approve;
      this.status[2].date =
        res[0].is_company_date_approve + ' ' + res[0].is_company_time_approve;
      this.status[3].date =
        res[0].is_student_date_approve + ' ' + res[0].is_student_time_approve;
      this.status[4].date =
        res[0].is_petition_student_date_approve +
        ' ' +
        res[0].is_petition_student_time_approve;
      this.status[5].date =
        res[0].is_petition_student_date_approve +
        ' ' +
        res[0].is_petition_student_time_approve;

      const data: any = res.filter((item) => item.id == id);

      if (
        JSON.parse(localStorage.getItem('userData') || '[]')[0].username ===
          'teacher' ||
        JSON.parse(localStorage.getItem('userData') || '[]')[0].username ===
          'admin'
      ) {
        this.data_petition$.next(res);
      } else {
        this.data_petition$.next(
          res.filter(
            (x: any) =>
              x.authorization ===
              JSON.parse(localStorage.getItem('userData') || '[]')[0].username
          )
        );
      }
      // this.status.map((item) => {
      //   item.accept = data[0].is_teacher_approve;
      // });

      this.m1.next(data[0].is_teacher_approve);
      console.log(data[0].is_teacher_approve);
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
      this.form.get('email')?.disable();
      this.form.get('work_details')?.disable();
      this.form.get('register_next_semester')?.disable();
      this.form.get('delivery_of_documents')?.disable();

      if (res[0].is_name_cancel.length > 0) {
        this.status[0].accept = res[0].is_name_cancel;
        this.status[0].status = 'false';
        this.status[0].date =
          res[0].is_cancel_date_approve + ' ' + res[0].is_cancel_time_approve;
        this.status[0].accept2 = res[0].is_name_cancel;
        this.status[0].detail =
          'ยกเลิกคำร้อง ' + ' โดย  ' + res[0].is_name_cancel;

        this.status[1].accept = '-';
        this.status[1].status = 'pending';
        this.status[1].date = '-';
        this.status[1].accept2 = '-';
        this.status[1].detail = '-';

        this.status[2].accept = '-';
        this.status[2].status = 'pending';
        this.status[2].date = '-';
        this.status[2].accept2 = '-';
        this.status[2].detail = '-';

        this.status[3].accept = '-';
        this.status[3].status = 'pending';
        this.status[3].date = '-';
        this.status[3].accept2 = '-';
        this.status[3].detail = '-';

        this.status[4].accept = '-';
        this.status[4].status = 'pending';
        this.status[4].date = '-';
        this.status[4].accept2 = '-';
        this.status[4].detail = '-';

        this.status[5].accept = '-';
        this.status[5].status = 'pending';
        this.status[5].date = '-';
        this.status[5].accept2 = '-';
        this.status[5].detail = '-';

        return;
      }
    });

    this._petitionService.DoGetAllPetitionWithID().subscribe((response) => {
      this.status.map((item) => {
        // item.accept = response
      });
      this.data$.next(response);
    });
  }

  DoConvertCodeToTextDeliveryOfDocuments(item: TypePayload) {
    if (item.delivery_of_documents === '00') {
      return 'นิสิตส่งหนังสือเองให้กับทางสถานประกอบการ';
    } else if (item.delivery_of_documents === '01') {
      return 'คณะจัดส่งให้ทาง ไปรษณีย์ EMS';
    } else if (item.delivery_of_documents === '02') {
      return 'จัดส่งทาง อีเมล์';
    } else {
      return 'ไม่พบข้อมูล';
    }
  }

  DoConvertCodeToTextRegisterNextSemester(item: TypePayload) {
    if (item.register_next_semester === '00') {
      return 'ลงทะเบียนวิชาฝึกงานวิชาเดียว';
    } else if (item.register_next_semester === '01') {
      return 'ลงทะเบียนวิชาฝึกงานร่วมกับวิชาอื่น';
    } else {
      return 'ไม่พบข้อมูล';
    }
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
    // email: new FormControl('', [Validators.required]),
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
