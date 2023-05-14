import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TypePayload } from 'src/app/shared/payload/payload.model';
import { PetitionService } from 'src/app/shared/services/petition.service';

@Component({
  selector: 'app-company-manager',
  templateUrl: './company-manager.component.html',
  styleUrls: ['./company-manager.component.scss'],
})
export class CompanyManagerComponent implements OnInit {
  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private _petitionService: PetitionService) {}

  /* -------------------------------------------------------------------------- */
  //*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  public data$ = new BehaviorSubject<any[]>([]);
  public data_user_report_success$ = new BehaviorSubject<any[]>([]);

  public searchFilter: string = '';
  /* -------------------------------------------------------------------------- */
  //*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit() {
    this._petitionService.DoGetAllPetitionWithID().subscribe((response) => {
      this.data$.next(response);
      console.log(response);
      this.data_user_report_success$.next(
        this.data$.value.filter(
          (x) =>
            x.is_approved_cancel === false &&
            x.is_approved_success === false &&
            x.is_approved_company === false &&
            x.is_approved_report === true
        )
      );
    });
  }

  /* -------------------------------------------------------------------------- */
  //*                                  functions                                 */
  /* -------------------------------------------------------------------------- */
  DoApproveCompanyPetition(item: TypePayload): void {
    this._petitionService.DoApproveCompanyPetition(item);
  }
  DoCancelApproveCompanyPetition(item: TypePayload): void {
    this._petitionService.DoCancelApprovePetition(item);
  }
}
