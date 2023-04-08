import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form!: FormGroup;

  constructor() {}

  // @Input() set formGroup(value: FormGroup) {
  //   if (value) this._projectForm = value;
  // }

  ngOnInit() {
    this.initForm();
    this.form.valueChanges.subscribe((res) => {
      console.log(res);
    });
  }

  initForm(): void {
    this.form = new FormGroup({
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
