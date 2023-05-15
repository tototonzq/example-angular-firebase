import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { TypePayload } from 'src/app/shared/payload/payload.model';
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
    private _route: ActivatedRoute
  ) {}

  /* -------------------------------------------------------------------------- */
  //*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  public data$ = new BehaviorSubject<any[]>([]);

  public searchFilter: string = '';

  /* -------------------------------------------------------------------------- */
  //*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    this._petitionService.DoGetAllPetitionWithID().subscribe((response) => {
      this.data$.next(response);
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
      !is_approved_success
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
      is_approved_company
    ) {
      return 'ดำเนินการสําเร็จ';
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
}
