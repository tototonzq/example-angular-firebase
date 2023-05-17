import { Component, OnDestroy, OnInit } from '@angular/core';
import { MENU_DROPDOWN_PETITION_ROUND } from '../manager-prtition.data';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './manager-petition-setting.component.html',
  styleUrls: ['./manager-petition-setting.component.css'],
})
export class ManagerPetitionSettingComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  //*                                unsubscribe$                                */
  /* -------------------------------------------------------------------------- */
  _destroy$ = new Subject<void>();

  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private _adminService: AdminService) {}

  /* -------------------------------------------------------------------------- */
  //*                                     var                                    */
  /* -------------------------------------------------------------------------- */
  petition_round = new FormControl('', [Validators.required]);

  // ! dta
  public round$ = new BehaviorSubject<string>('');

  /* -------------------------------------------------------------------------- */
  //*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    this.petition_round.valueChanges.subscribe((value) => {
      console.log(value);
    });

    // TODO : Get petition round
    this._adminService.getRoundPetition().subscribe((value: any) => {
      console.log(value);
      this.round$.next(value);
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  /* -------------------------------------------------------------------------- */
  //*                                    Data                                    */
  /* -------------------------------------------------------------------------- */
  data_dropdown: any[] = MENU_DROPDOWN_PETITION_ROUND;

  /* -------------------------------------------------------------------------- */
  //*                                  functions                                 */
  /* -------------------------------------------------------------------------- */
  changeRoundPetition() {
    if (!this.petition_round.value) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: `กรุณาเลือกรอบการลงทะเบียน !`,
        showConfirmButton: false,
        timer: 1200,
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `เปลี่ยนรอบการลงทะเบียนเรียบร้อย !`,
        showConfirmButton: false,
        timer: 1200,
      });
      const data: any = {
        round_petition: this.petition_round.value,
      };
      this._adminService.changeRoundPetition(data);
    }
  }
}
