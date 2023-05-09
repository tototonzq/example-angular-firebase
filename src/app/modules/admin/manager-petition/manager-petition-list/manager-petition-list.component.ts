import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MENU_DROPDOWN_PETITION_ROUND } from '../manager-prtition.data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manager-petition-list',
  templateUrl: './manager-petition-list.component.html',
  styleUrls: ['./manager-petition-list.component.css'],
})
export class ManagerPetitionListComponent implements OnInit {
  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private _route: ActivatedRoute, private _router: Router) {}
  /* -------------------------------------------------------------------------- */
  //*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  //*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {}
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
}
