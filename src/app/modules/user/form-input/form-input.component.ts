import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent implements OnInit {
  /* -------------------------------------------------------------------------- */
  /*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor() {}
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  data_form_1: any;
  data_form_2: any;
  /* -------------------------------------------------------------------------- */
  /*                                 Life Circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit() {
    this.initForm();

    // @FormGroup I
    this.form.valueChanges.subscribe((res) => {
      console.log(res);
      this.data_form_1 = res;
    });

    // @FormGroup II
    this.form2.valueChanges.subscribe((res) => {
      console.log(res);
      this.data_form_2 = res;
    });

    // @FormControl
    this.value7.valueChanges.subscribe((res) => {
      console.log(`@FormControl : ${res}`);
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                                @FormGroup I                                */
  /* -------------------------------------------------------------------------- */
  // Variables
  form: FormGroup = new FormGroup({
    value1: new FormControl('', [Validators.required]),
    value2: new FormControl('', [Validators.required]),
    value3: new FormControl('', [Validators.required]),
  });

  // Get Set Form
  get value1(): FormControl {
    return this.form.get('value1') as FormControl;
  }

  get value2(): FormControl {
    return this.form.get('value2') as FormControl;
  }

  get value3(): FormControl {
    return this.form.get('value3') as FormControl;
  }

  // Functions
  onSubmitFormGroupI(): void {
    console.log(
      `@FormGroupSubmit I : ${this.form.get('value1')?.value} ${
        this.form.get('value2')?.value
      } ${this.form.get('value3')?.value}`
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                                @FormGroup II                               */
  /* -------------------------------------------------------------------------- */
  form2!: FormGroup;
  /* -------------------------------------------------------------------------- */
  /*                                  Function                                  */
  /* -------------------------------------------------------------------------- */
  initForm(): void {
    this.form2 = new FormGroup({
      value4: new FormControl('', [Validators.required]),
      value5: new FormControl('', [Validators.required]),
      value6: new FormControl('', [Validators.required]),
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                                   @NgForm                                  */
  /* -------------------------------------------------------------------------- */
  // Functions
  onSubmit(data: NgForm) {
    console.log(data.value);
    console.log(data.valid);
  }

  /* -------------------------------------------------------------------------- */
  /*                                    @Form                                   */
  /* -------------------------------------------------------------------------- */
  // Functions
  onSubmitForm(name: string, surname: string): void {
    console.log(`@Form : Name: ${name} : Surname: ${surname}`);
  }

  /* -------------------------------------------------------------------------- */
  /*                                @FormControl                                */
  /* -------------------------------------------------------------------------- */
  // Variables
  value7 = new FormControl('', [Validators.required, Validators.minLength(2)]);
  // Functions
  onSubmitFormControl(): void {
    console.log(`@FormControlSubmit : ${this.value7.value}`);
  }
}
