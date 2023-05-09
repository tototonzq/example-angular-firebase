import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.css'],
})
export class DashboardListComponent implements OnInit {
  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private _studentService: StudentService) {}
  /* -------------------------------------------------------------------------- */
  //*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  data$ = new BehaviorSubject<any[]>([]);
  data_status_false$ = new BehaviorSubject<any[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(true);
  status_approve$ = new BehaviorSubject<any[]>([]);
  status_company$ = new BehaviorSubject<any[]>([]);
  /* -------------------------------------------------------------------------- */
  //*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit() {
    this._studentService.getAllPetition().subscribe((res) => {
      // console.log(res);
      const status_approved_report = res.filter(
        (item: { status_approved_report: boolean }) => item.status_approved_report === false
      );
      const statusApprove = res.filter(
        (item: { status_approved_report: boolean }) => item.status_approved_report === true
      );
      const statusCompany = res.filter(
        (item: { status_approved_company: boolean }) => item.status_approved_company === true
      );
      this.status_company$.next(statusCompany);
      this.status_approve$.next(statusApprove);
      this.data_status_false$.next(status_approved_report);
      this.isLoading$.next(false);
      this.data$.next(res);
    });
  }
}
