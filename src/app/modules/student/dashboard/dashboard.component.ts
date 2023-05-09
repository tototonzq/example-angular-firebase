import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  constructor(private _studentService: StudentService) {}

  /* -------------------------------------------------------------------------- */
  //*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  public data$ = new BehaviorSubject<any[]>([]);
  public petition_status_false$ = new BehaviorSubject<any[]>([]);
  public petition_status_true$ = new BehaviorSubject<any[]>([]);
  public petition_status_approved$ = new BehaviorSubject<any[]>([]);
  public petition_status_multi_approved$ = new BehaviorSubject<any[]>([]);

  /* -------------------------------------------------------------------------- */
  //*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    this._studentService
      .getAllPetition(
        JSON.parse(localStorage.getItem('userData') || '[]')[0].username
      )
      .subscribe((res) => {
        // TODO : Get data all
        // console.log(res);
        this.data$.next(res);

        // TODO : Get data status approved company false
        const petition_status_false = res.filter(
          (x: { is_cancel: boolean; status_approved_report: boolean }) =>
            x.status_approved_report === false && x.is_cancel === false
        );
        // console.log(petition_status_false);
        this.petition_status_false$.next(petition_status_false);

        // TODO : Get data status approved company true
        // const petition_status_true = data.filter(
        //   (x: { status_approved_company: boolean }) => x.status_approved_company === true
        // );
        // this.petition_status_true$.next(petition_status_true);

        // const petition_status_approved = data.filter(
        //   (x: { status_approved_company: boolean }) => x.status_approved_company === true
        // );
        // this.petition_status_approved$.next(petition_status_approved);
        // // console.log(petition_status_approved);

        // const petition_status_multi_approved = data.filter(
        //   (x: { status_approved_company: boolean; status_approved_company: boolean }) =>
        //     x.status_approved_company === true && x.status_approved_company === true
        // );
        // this.petition_status_multi_approved$.next(petition_status_multi_approved);
      });
  }

  ngOnDestroy(): void {}

  /* -------------------------------------------------------------------------- */
  //*                                  functions                                 */
  /* -------------------------------------------------------------------------- */
}
