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
    this._studentService.getAllPetition().subscribe((res) => {
      // TODO : filter data
      // console.log(res);
      const data = res.filter(
        (item: { '0': string }) =>
          item[0] ===
          JSON.parse(localStorage.getItem('userData') || '[]')[0].username
      );
      // console.log(data);
      this.data$.next(data);
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
}
