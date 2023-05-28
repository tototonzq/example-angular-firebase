import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserDataModelResponse } from 'src/app/modules/auth/sign-in/store/models/sign-in.interface.model';
import { SignInSelectors } from 'src/app/modules/auth/sign-in/store/selectors/sign-in.selectors';
import { TypePayload } from 'src/app/shared/payload/payload.model';
import { GeneratePdfService } from 'src/app/shared/services/generate-pdf.service';
import { PetitionService } from 'src/app/shared/services/petition.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.css'],
})
export class ManagerListComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  //*                                 unsubscribe                                */
  /* -------------------------------------------------------------------------- */
  _destroy$ = new Subject<void>();

  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private _petitionService: PetitionService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _generatePdfService: GeneratePdfService
  ) {}

  /* -------------------------------------------------------------------------- */
  //*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  public data$ = new BehaviorSubject<any[]>([]);
  public data_approved_status_false$ = new BehaviorSubject<any[]>([]);
  public data_approved_status_true$ = new BehaviorSubject<any[]>([]);
  public data_is_cancel_status_true$ = new BehaviorSubject<any[]>([]);
  // TODO : Local storage
  public data: TypePayload = JSON.parse(
    localStorage.getItem('userData') || '[]'
  );
  public searchFilter: string = '';
  @Select(SignInSelectors.getDataUserLogin) getDataUserLogin$!: Observable<
    UserDataModelResponse | TypePayload
  >;

  /* -------------------------------------------------------------------------- */
  //*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    this._petitionService.DoGetAllPetitionWithID().subscribe((response) => {
      this.data$.next(response);
      this.data_approved_status_false$.next(
        response.filter(
          (x) =>
            x.is_approved_report === false &&
            x.is_approved_cancel === false &&
            x.major === this.data[0].major
        )
      );
      this.getDataUserLogin$.subscribe((response) => {
        if (response === null) return;
        //* Save the updated data to localStorage
        this.data = response; // Set the data to the response directly
        localStorage.setItem('userData', JSON.stringify(this.data));
      });
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  /* -------------------------------------------------------------------------- */
  //*                                  functions                                 */
  /* -------------------------------------------------------------------------- */
  DoGetStatusApprove(item: any) {
    const {
      is_approved_success,
      is_approved_cancel,
      is_approved_report,
      is_approved_company,
      is_approved_admin_report,
      is_approved_student_success,
      is_complete,
    } = item;
    if (
      !is_approved_success &&
      !is_approved_cancel &&
      !is_approved_report &&
      !is_approved_company
    ) {
      return 'กำลังดำเนินการ';
    }
    if (
      !is_approved_cancel &&
      is_approved_report &&
      !is_approved_company &&
      !is_approved_success &&
      !is_approved_admin_report
    ) {
      return 'รอจัดทำหนังสือขอความอนุเคราะห์';
    }
    if (
      !is_approved_cancel &&
      is_approved_report &&
      !is_approved_company &&
      !is_approved_success &&
      is_approved_admin_report
    ) {
      return 'รอการตอบรับจากสถานประกอบการ';
    }
    if (
      is_approved_report &&
      is_approved_company &&
      !is_approved_success &&
      !is_approved_cancel
    ) {
      return 'รอการยืนยัน';
    }
    if (
      is_approved_success &&
      !is_approved_cancel &&
      is_approved_report &&
      is_approved_company &&
      is_approved_student_success &&
      is_complete
    ) {
      return 'ดำเนินการสําเร็จ';
    }
    if (
      is_approved_success &&
      !is_approved_cancel &&
      is_approved_report &&
      is_approved_company &&
      is_approved_student_success &&
      !is_complete
    ) {
      return 'รอการจัดทำหนังสือส่งตัว';
    }
    if (
      (!is_approved_success &&
        is_approved_cancel &&
        !is_approved_report &&
        !is_approved_company) ||
      (is_approved_cancel && is_approved_report)
    ) {
      return 'เอกสารถูกปฎิเสธ';
    } else {
      return 'พบข้อผิดพลาด';
    }
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

  DoViewDetailsCourtesy(item: TypePayload): void {
    // console.log(item);
    if (!item.url_courtesy) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: `ไม่พบข้อมูล`,
        showConfirmButton: false,
        timer: 1200,
      });
    } else window.open(item.url_courtesy, '_blank');
    return;
  }

  DoViewDetailsResponse(item: TypePayload): void {
    // console.log(item);
    if (!item.url_response) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: `ไม่พบข้อมูล`,
        showConfirmButton: false,
        timer: 1200,
      });
    } else window.open(item.url_response, '_blank');
    return;
  }

  DoViewDetailsSend(item: TypePayload): void {
    // console.log(item);
    if (!item.url_send) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: `ไม่พบข้อมูล`,
        showConfirmButton: false,
        timer: 1200,
      });
    } else window.open(item.url_send, '_blank');
    return;
  }

  DoCancelApprovePetition(): void {
    alert('ยกเลิกการอนุมัติ');
  }

  DoApproveReportPetition(): void {
    alert('อนุมัติ');
  }

  DoResetToFalse(item: TypePayload): void {
    this._petitionService.DoResetToFalse(item);
  }

  DoViewDetails(item: TypePayload): void {
    // alert('ดูรายละเอียด');
    this._router.navigate(['./detail'], {
      relativeTo: this._route,
      replaceUrl: true,
      queryParams: { id: item.id },
    });
    // this._cdr.detectChanges();
  }

  /* -------------------------------------------------------------------------- */
  //*                                    Data                                    */
  /* -------------------------------------------------------------------------- */

  DoViewPDF(item: TypePayload) {
    this._generatePdfService.DoExportPDF2(item);
  }

  DoViewPDF2(item: TypePayload) {
    console.log(item);
    this._generatePdfService.DoExportPDF(item);
  }
}
