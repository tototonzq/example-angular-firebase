import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PetitionService } from 'src/app/shared/services/petition.service';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  templateUrl: './petition-table.component.html',
  styleUrls: ['./petition-table.component.css'],
})
export class PetitionTableComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private _studentService: StudentService,
    private _petitionService: PetitionService
  ) {}

  /* -------------------------------------------------------------------------- */
  //*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  public data$ = new BehaviorSubject<any[]>([]);
  public data_user_petition$ = new BehaviorSubject<any[]>([]);
  public data_user_approved_status_false$ = new BehaviorSubject<any[]>([]);
  public data_user_approved_status_true$ = new BehaviorSubject<any[]>([]);
  public data_user_is_cancel_status_true$ = new BehaviorSubject<any[]>([]);

  public searchFilter: string = '';

  /* -------------------------------------------------------------------------- */
  //*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    this._petitionService.DoGetAllPetitionWithID().subscribe((response) => {
      // console.log(response);
      this.data$.next(response);
      this.data_user_petition$.next(
        response.filter(
          (x: string) =>
            x[0] ===
            JSON.parse(localStorage.getItem('userData') || '[]')[0].username
        )
      );
      console.log(this.data_user_petition$.value);
      this.data_user_approved_status_false$.next(
        this.data_user_petition$.value.filter(
          (x) => x.status_approved_report === false
        )
      );
      // console.log(this.data_user_approved_status_false$.value);
      this.data_user_approved_status_true$.next(
        this.data_user_petition$.value.filter(
          (x) => x.status_approved_report === true
        )
      );
    });
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
    // this._studentService.deletePetition(payload);
  }

  cancelPetition(payload: any) {
    alert('ยกลิกคำร้อง');
    // this._studentService.cancelPetition(payload);
  }

  DoConfirmPetition(payload: any) {
    alert('ยืนยันคำร้อง');
  }
}
