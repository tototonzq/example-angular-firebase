import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PetitionService } from 'src/app/shared/services/petition.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private _petitionService: PetitionService) {}

  /* -------------------------------------------------------------------------- */
  //*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  public data$ = new BehaviorSubject<any[]>([]);
  public data_user_petition$ = new BehaviorSubject<any[]>([]);
  public data_user_approved_status_false$ = new BehaviorSubject<any[]>([]);
  public data_user_approved_status_true$ = new BehaviorSubject<any[]>([]);
  public data_user_is_cancel_status_true$ = new BehaviorSubject<any[]>([]);
  public data_user_is_success$ = new BehaviorSubject<any[]>([]);
  public data_user_company_success$ = new BehaviorSubject<any[]>([]);

  // TODO : ด้านล่างรอตรวจ
  public petition_status_multi_approved$ = new BehaviorSubject<any[]>([]);

  /* -------------------------------------------------------------------------- */
  //*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    this._petitionService.DoGetAllPetitionWithID().subscribe((response) => {
      // console.log(response);
      this.data$.next(response);
      //*  ข้อมูลผู้ใช้งาน
      //* --------------------------- filter data of user -------------------------- */
      this.data_user_petition$.next(
        response.filter(
          (x: any) =>
            x.authorization ===
            JSON.parse(localStorage.getItem('userData') || '[]')[0].username
        )
      );
      // console.log(this.data_user_petition$.value);
      // * ข้อมูลผู้ใช้งานรอการตรวจสอบ
      //* ---------------------- filter data of user is false ---------------------- */
      this.data_user_approved_status_false$.next(
        this.data_user_petition$.value.filter(
          (x) =>
            x.is_approved_cancel === false &&
            x.is_approved_success === false &&
            x.is_approved_report === false &&
            x.is_approved_company === false
        )
      );
      // * ข้อมูลผู้ใช้ที่ผ่านการอนุมัติ
      // console.log(this.data_user_approved_status_false$.value);
      //* ----------------------- filter data of user is true ---------------------- */
      this.data_user_approved_status_true$.next(
        this.data_user_petition$.value.filter(
          (x) =>
            x.is_approved_cancel === false &&
            x.is_approved_success === false &&
            x.is_approved_report === true &&
            x.is_approved_company === false
        )
      );
      // console.log(this.data_user_approved_status_true$.value);
      //* ----------------------- filter data of user is success ---------------------- */
      this.data_user_is_success$.next(
        this.data_user_petition$.value.filter(
          (x) =>
            x.is_approved_cancel === false &&
            x.is_approved_success === true &&
            x.is_approved_company === true &&
            x.is_approved_report === true
        )
      );
      // * สถานประกอบการอนุมัติ
      this.data_user_company_success$.next(
        this.data_user_petition$.value.filter(
          (x) =>
            x.is_approved_cancel === false &&
            x.is_approved_success === false &&
            x.is_approved_company === true &&
            x.is_approved_report === true
        )
      );
    });
  }

  ngOnDestroy(): void {}

  /* -------------------------------------------------------------------------- */
  //*                                  functions                                 */
  /* -------------------------------------------------------------------------- */
  DoConfirmPetition(item: any) {
    // console.log(item);
    this._petitionService.DoConfirmApprovePetition(item);
  }

  DoCancelPetition(item: any) {
    // console.log(item);
    this._petitionService.DoCancelApprovePetition(item);
  }
}
