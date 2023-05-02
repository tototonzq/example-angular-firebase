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
  /* -------------------------------------------------------------------------- */
  //*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit() {
    this._studentService.getAllPetition().subscribe((res) => {
      // console.log(res);
      const status = res.filter(
        (item: { status: boolean }) => item.status === false
      );
      // console.log(status);
      this.data_status_false$.next(status);

      setTimeout(() => {
        this.isLoading$.next(false);
        this.data$.next(res);
      }, 1000);
    });
  }
}
