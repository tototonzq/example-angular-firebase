import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Subject } from 'rxjs';
import { PetitionService } from 'src/app/shared/services/petition.service';
import { StudentService } from 'src/app/shared/services/student.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.css'],
})
export class DashboardListComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  /*                                 unsubscribe                                */
  /* -------------------------------------------------------------------------- */
  _destroy$ = new Subject<void>();

  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private _studentService: StudentService,
    private _auth: AngularFireAuth,
    private _firestore: AngularFirestore,
    private _petitionService: PetitionService
  ) {}

  /* -------------------------------------------------------------------------- */
  //*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  // TODO : Var
  data$ = new BehaviorSubject<any[]>([]);
  data_approved_status_false$ = new BehaviorSubject<any[]>([]);
  data_approved_status_true$ = new BehaviorSubject<any[]>([]);
  data_is_cancel_status_true$ = new BehaviorSubject<any[]>([]);

  /* -------------------------------------------------------------------------- */
  //*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit() {
    this._petitionService.DoGetAllPetitionWithID().subscribe((response) => {
      this.data$.next(response);
      this.data_approved_status_false$.next(
        response.filter(
          (x) => x.status_approved_report === false && x.is_cancel === false
        )
      );
      this.data_approved_status_true$.next(
        response.filter((x) => x.status_approved_report === true)
      );
      this.data_is_cancel_status_true$.next(
        response.filter((x) => x.is_cancel === true)
      );
    });

    // // TODO : Get approved status false
    // this._petitionService
    //   .DoGetAllPetitionReportWithKey(false)
    //   .onSnapshot((res) => {
    //     // console.log(res.docs.map((x) => x.data()));
    //     this.data_status_false$.next(res.docs.map((x) => x.data()));
    //   });

    // // TODO : Get approved status true
    // this._petitionService
    //   .DoGetAllPetitionReportWithKey(true)
    //   .onSnapshot((res) => {
    //     // console.log(res.docs.map((x) => x.data()));
    //     this.status_approve$.next(res.docs.map((x) => x.data()));
    //   });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  /* -------------------------------------------------------------------------- */
  //*                                  functions                                 */
  /* -------------------------------------------------------------------------- */
  DoApprovePetition(item: any) {
    // console.log(item);
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่ว่าต้องการอนุมัติ?',
      text: 'แตะที่อื่นเพื่อยกเลิกการทำงาน!',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'ใช่, อนุมัติ!',
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `อนุมัติสำเร็จ`,
          showConfirmButton: false,
          timer: 1200,
        });
        this._petitionService.DoApprovePetition(item);
      }
    });
  }

  DoCancelApprovePetition(item: any) {
    // console.log(item);
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่ว่าต้องการปฏิเสธ?',
      text: 'แตะที่อื่นเพื่อยกเลิกการทำงาน!',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'ใช่, ปฏิเสธ!',
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `อนุมัติสำเร็จ`,
          showConfirmButton: false,
          timer: 1200,
        });
        this._petitionService.DoCancelApprovePetition(item);
      }
    });
  }
}
