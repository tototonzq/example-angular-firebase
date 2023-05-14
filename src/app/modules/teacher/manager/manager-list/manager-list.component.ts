import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TypePayload } from 'src/app/shared/payload/payload.model';
import { PetitionService } from 'src/app/shared/services/petition.service';
import { StudentService } from 'src/app/shared/services/student.service';

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
  constructor(private _petitionService: PetitionService) {}

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

  DoViewDetails(item: TypePayload): void {
    // console.log(item);
    if (!item.url_petition) {
      alert('ไม่พบข้อมูล');
    } else window.open(item.url_petition, '_blank');
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

  /* -------------------------------------------------------------------------- */
  //*                                    Data                                    */
  /* -------------------------------------------------------------------------- */
}
