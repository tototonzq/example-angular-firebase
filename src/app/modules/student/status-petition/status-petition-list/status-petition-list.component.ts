import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-status-petition-list',
  templateUrl: './status-petition-list.component.html',
  styleUrls: ['./status-petition-list.component.css'],
})
export class StatusPetitionListComponent implements OnInit {
  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private _studentService: StudentService) {}

  /* -------------------------------------------------------------------------- */
  //*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  data$ = new BehaviorSubject<any[]>([]);
  data_s = new Subject<any[]>();
  data: any[] | undefined;
  /* -------------------------------------------------------------------------- */
  //*                                 Life Circle                                */
  /* -------------------------------------------------------------------------- */

  ngOnInit() {
    const data = localStorage.getItem('userData');
    const userData = JSON.parse(data || '[]');
    // console.log(userData[0].username);
    this._studentService.getAllPetition().subscribe((res) => {
      delete res[0];
      console.log(res);
      // this.data$.next(res);
      // this.data_s.next(res);
      this.data = res;
    });
  }

  data2: any = [
    {
      id: 1,
    },
  ];
}
