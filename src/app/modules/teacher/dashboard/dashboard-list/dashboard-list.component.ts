import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserDataModelResponse } from 'src/app/modules/auth/sign-in/store/models/sign-in.interface.model';
import { SignInSelectors } from 'src/app/modules/auth/sign-in/store/selectors/sign-in.selectors';
import { TypePayload } from 'src/app/shared/payload/payload.model';
import { PetitionService } from 'src/app/shared/services/petition.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.css'],
})
export class DashboardListComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  //*                                  Selected                                  */
  /* -------------------------------------------------------------------------- */
  @Select(SignInSelectors.getDataUserLogin) getDataUserLogin$!: Observable<
    UserDataModelResponse | TypePayload
  >;
  /* -------------------------------------------------------------------------- */
  //*                                 unsubscribe                                */
  /* -------------------------------------------------------------------------- */
  _destroy$ = new Subject<void>();

  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private _petitionService: PetitionService) {}

  /* -------------------------------------------------------------------------- */
  //*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  // TODO : Var
  public data$ = new BehaviorSubject<any[]>([]);
  public data_approved_status_false$ = new BehaviorSubject<any[]>([]);
  public data_approved_status_true$ = new BehaviorSubject<any[]>([]);
  public data_is_cancel_status_true$ = new BehaviorSubject<any[]>([]);
  // TODO : Local storage
  public data: TypePayload = JSON.parse(
    localStorage.getItem('userData') || '[]'
  );

  /* -------------------------------------------------------------------------- */
  //*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit() {
    this._petitionService.DoGetAllPetitionWithID().subscribe((response) => {
      this.data$.next(response);
      this.data_approved_status_false$.next(
        response.filter(
          (x) =>
            x.is_approved_report === false && x.is_approved_cancel === false
        )
      );
      this.data_approved_status_true$.next(
        response.filter(
          (x) => x.is_approved_report === true && x.is_approved_cancel === false
        )
      );
      this.data_is_cancel_status_true$.next(
        response.filter((x) => x.is_approved_cancel === true)
      );
    });
    console.log(this.data);

    //* Data user local storage
    this.getDataUserLogin$.subscribe((response) => {
      if (response === null) return;
      //* Save the updated data to localStorage
      this.data.push(...response);
      localStorage.setItem('userData', JSON.stringify(this.data));
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  /* -------------------------------------------------------------------------- */
  //*                                    Logic                                   */
  /* -------------------------------------------------------------------------- */
  currentTime = new Date();
  TIME = this.currentTime.getHours() + ':' + this.currentTime.getMinutes();
  DMY =
    this.currentTime.getDate() +
    '-' +
    (this.currentTime.getMonth() + 1) +
    '-' +
    this.currentTime.getFullYear();

  /* -------------------------------------------------------------------------- */
  //*                                  functions                                 */
  /* -------------------------------------------------------------------------- */
  DoApproveReportPetition(item: any) {
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
        console.log(this.currentTime);
        console.log(this.TIME);
        console.log(this.DMY);
        this._petitionService.DoApproveReportPetition(
          item,
          this.data,
          this.TIME,
          this.DMY
        );
      }
    });
  }

  DoCancelApprovePetition(item: TypePayload) {
    console.log(item);
    // Swal.fire({
    //   title: 'คุณแน่ใจหรือไม่ว่าต้องการปฏิเสธ?',
    //   text: 'แตะที่อื่นเพื่อยกเลิกการทำงาน!',
    //   icon: 'warning',
    //   showCancelButton: false,
    //   confirmButtonColor: '#3085d6',
    //   confirmButtonText: 'ใช่, ปฏิเสธ!',
    // }).then((result) => {
    //   if (result.value) {
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'success',
    //       title: `อนุมัติสำเร็จ`,
    //       showConfirmButton: false,
    //       timer: 1200,
    //     });
    //     this._petitionService.DoCancelApprovePetition(item);
    //   }
    // });
  }

  DoResetToFalse(item: TypePayload): void {
    this._petitionService.DoResetToFalse(item);
  }
}
