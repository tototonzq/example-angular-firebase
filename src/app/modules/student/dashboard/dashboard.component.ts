import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PetitionService } from 'src/app/shared/services/petition.service';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
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

  public data_user_is_success$ = new BehaviorSubject<any[]>([]);

  public petition_status_multi_approved$ = new BehaviorSubject<any[]>([]);

  /* -------------------------------------------------------------------------- */
  //*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    this._petitionService.DoGetAllPetitionWithID().subscribe((response) => {
      console.log(response);
      // this.data$.next(response);
      this.data_user_petition$.next(
        response.filter(
          (x: string) =>
            x[0] ===
            JSON.parse(localStorage.getItem('userData') || '[]')[0].username
        )
      );
      this.data_user_approved_status_false$.next(
        this.data_user_petition$.value.filter(
          (x) =>
          x.is_cancel === false &&
          x.is_success === false &&
          x.status_approved_report === false &&
          x.status_approved_company === false
        )
      );
      // console.log(this.data_user_approved_status_false$.value);
      this.data_user_approved_status_true$.next(
        this.data_user_petition$.value.filter(
          (x) =>
            x.is_cancel === false &&
            x.is_success === false &&
            x.status_approved_report === true &&
            x.status_approved_company === false
        )
      );
      this.data_user_is_success$.next(
        this.data_user_petition$.value.filter(
          (x) =>
            x.is_cancel === false &&
            x.is_success === true &&
            x.status_approved_company === true &&
            x.status_approved_report === true
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
}
