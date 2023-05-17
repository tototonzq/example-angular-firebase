import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MENU_DROPDOWN_PETITION_ROUND } from '../manager-prtition.data';
import { ActivatedRoute, Router } from '@angular/router';
import { PetitionService } from 'src/app/shared/services/petition.service';
import { BehaviorSubject } from 'rxjs';
import { TypePayload } from 'src/app/shared/payload/payload.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manager-petition-list',
  templateUrl: './manager-petition-list.component.html',
  styleUrls: ['./manager-petition-list.component.css'],
})
export class ManagerPetitionListComponent implements OnInit {
  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _petitionService: PetitionService
  ) {}
  /* -------------------------------------------------------------------------- */
  //*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  public searchFilter: string = '';
  public data$ = new BehaviorSubject<any[]>([]);
  /* -------------------------------------------------------------------------- */
  //*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    this._petitionService.DoGetAllPetitionWithID().subscribe((response) => {
      this.data$.next(response);
    });
  }
  /* -------------------------------------------------------------------------- */
  //*                                  functions                                 */
  /* -------------------------------------------------------------------------- */
  goToSettingPetition(): void {
    this._router.navigate(['./setting-petition'], {
      relativeTo: this._route,
      replaceUrl: true,
    });
    // this._cdr.detectChanges();
  }

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
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: `ไม่พบข้อมูล`,
        showConfirmButton: false,
        timer: 1200,
      });
    } else window.open(item.url_petition, '_blank');
    return;
  }

  DoResetToFalse(item: TypePayload): void {
    this._petitionService.DoResetToFalse(item);
  }

  DoDeletePetition(item: TypePayload): void {
    this._petitionService.DoDeletePetition(item);
  }
}
