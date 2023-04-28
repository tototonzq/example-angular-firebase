import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownRole } from '../../admin/manager/store/models/manager.model';
import { MENU_DROPDOWN_PREFIX_STUDENT } from './manager-petition.data';
import { Subject } from 'rxjs';

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
  constructor() {}

  /* -------------------------------------------------------------------------- */
  //*                                 Life Circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      console.log(value);
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
  });

  // TODO : Dropdown
  dropdown: DropdownRole[] = MENU_DROPDOWN_PREFIX_STUDENT;
}

// การยื่นคำร้องข้อมูลการฝึกงานของนิสิต
// 1. ชื่อ-นามสกุล (คำนำหน้า นาง,นางสาว,นาย)
// 2. รหัสนิสิต
// 3.ชั้นปีที่
// 4. สาขาวิชา
// 5. หมายเลขโทรศัพท์
// 6. ที่อยู่ (บ้านเลขที่ , หมู่บ้าน , ตำบล/แขวง , อำเภอ/เขต , จังหวัด ,
// รหัสไปรษณีย์ )
// 7. email
// 8.ข้อมูลสภานที่ฝึกงาน
//   - ชื่อสถานที่ฝึกงาน
//   - เรียน(ให้ระบุชื่อบุคคลหรือตำแหน่งที่ต้องการส่งหนังสือขอความอนุเคราะห์ เช่น ผู้จัดการฝ่ายบุคคล, หัวหน้าส่วนงานไอที)
//   - ที่อยู่สถานที่ฝึกงาน ( บ้านเลขที่ , หมู่บ้าน , ตำบล/แขวง , อำเภอ/เขต , จังหวัด ,
// รหัสไปรษณีย์ )
//   - หมายเลขโทรศัพท์ของสถานที่ฝึกงาน
//   - หมายเลขโทรสารของสถานที่ฝึกงาน
//   - รายละเอียดหรือลักษณะงานที่นิสิตรับผิดชอบ
//   - การลงทะเบียนเรียนในภาคเรียนหน้า
// * ลงทะเบียนวิชาฝึกงานวิชาเดียว
// * ลงทะเบียนวิชาฝึกงานร่วมกับวิชาอื่น
//   - การส่งเอกสารให้แหล่งฝึกงาน
// 	*นิสิตส่งหนังสือเองให้กับทางสถานประกอบการ
// 	*คณะจัดส่งให้ทาง ไปรษณีย์ EMS
