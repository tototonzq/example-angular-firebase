import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  templateUrl: './petition-table.component.html',
  styleUrls: ['./petition-table.component.css'],
})
export class PetitionTableComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private _studentService: StudentService) {}

  /* -------------------------------------------------------------------------- */
  //*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  data$ = new BehaviorSubject<any[]>([]);
  /* -------------------------------------------------------------------------- */
  //*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    this._studentService
      .getAllPetition(
        JSON.parse(localStorage.getItem('userData') || '[]')[0].username
      )
      .subscribe((res) => {
        console.log(res);
        console.log(
          JSON.parse(localStorage.getItem('userData') || '[]')[0].username
        );

        const data_petition = res.filter(
          (x: { '0': string }) =>
            x[0] ===
            JSON.parse(localStorage.getItem('userData') || '[]')[0].username
        );
        console.log(data_petition);
        this.data$.next(data_petition);
      });
    // this._studentService.getAllPetition().subscribe((res) => {
    //   // TODO : filter data
    //   // console.log(res);
    //   const data = res.filter(
    //     (item: { '0': string }) =>
    //       item[0] ===
    //       JSON.parse(localStorage.getItem('userData') || '[]')[0].username
    //   );
    //   // console.log(data);
    //   this.data$.next(data);
    // });
  }
  ngOnDestroy(): void {}
  /* -------------------------------------------------------------------------- */
  //*                                  functions                                 */
  /* -------------------------------------------------------------------------- */

  getStatus(role: boolean) {
    const _role = role;
    if (_role === false) {
      return 'รอการอนุมัติ';
    } else if (_role === true) {
      return 'อนุมัติ';
    } else return 'พบข้อผิดพลาด';
  }

  getPetitionRound(round: string) {
    const _round = round;
    if (_round === 'r1') {
      return 'รอบที่ 1';
    } else if (_round === 'r2') {
      return 'รอบที่ 2';
    } else if (_round === 'r3') {
      return 'รอบที่ 3';
    } else return 'พบข้อผิดพลาด';
  }

  getStatusMultiApprove(
    status_approved_company: boolean,
    status_approved_report: boolean,
    is_cancel: boolean
  ) {
    const _status_approved = status_approved_company;
    const _status = status_approved_report;
    if (_status_approved === true && _status === true) {
      return 'สำเร็จ';
    } else if (_status_approved === true && _status === false) {
      // return 'รอการตรวจสอบ';
      return 'รอการตอบรับจากสถานประกอบการ';
    } else if (_status_approved === false && _status === true) {
      // return 'รอการตอบรับจากสถานประกอบการ';
      return 'รอการตรวจสอบ';
    } else if (
      _status_approved === false &&
      _status === false &&
      is_cancel === false
    ) {
      return 'กำลังดำเนินการ';
    } else if (
      _status_approved === false &&
      _status === false &&
      is_cancel === true
    ) {
      return 'ยกลิกคำร้อง';
    } else return 'พบข้อผิดพลาด';
  }

  // ! For test
  deletePetition(payload: any) {
    this._studentService.deletePetition(payload);
  }

  cancelPetition(payload: any) {
    alert('ยกลิกคำร้อง');
    this._studentService.cancelPetition(payload);
  }
}
