import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
  styleUrls: ['./form-project.component.scss'],
})
export class FormProjectComponent implements OnInit {
  _projectForm!: FormGroup;
  _card: string | null = '';
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor() {}
  /* -------------------------------------------------------------------------- */
  /*                                  variable                                  */
  /* -------------------------------------------------------------------------- */
  @Input() set formGroup(value: FormGroup) {
    if (value) this._projectForm = value;
  }

  @Input() set card(value: string | null) {
    if (value) this._card = value;
  }
  /* -------------------------------------------------------------------------- */
  /*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit() {
    this.initForm();
  }
  /* -------------------------------------------------------------------------- */
  /*                                  function                                  */
  /* -------------------------------------------------------------------------- */

  initForm(): void {
    this._projectForm = new FormGroup({
      /// cost-form
      project_name: new FormControl('', [Validators.required]),
      project_date: new FormControl('', [Validators.required]),
      customer_name: new FormControl('', [Validators.required]),
      /// general-form
      total_budget_no_vat: new FormControl(0, [
        Validators.required,
        Validators.min(0),
      ]),
      vat_value: new FormControl(0, [Validators.required, Validators.min(0)]),
      total_budget: new FormControl(0, [
        Validators.required,
        Validators.min(0),
      ]),
      direct_costs: new FormArray([], [Validators.minLength(1)]),
      ///
    });
  }
}
