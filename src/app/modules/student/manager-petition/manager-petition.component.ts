import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownRole } from '../../admin/manager/store/models/manager.model';
import { MENU_DROPDOWN_PREFIX_STUDENT } from './manager-petition.data';
import { Subject } from 'rxjs';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-manager-petition',
  templateUrl: './manager-petition.component.html',
  styleUrls: ['./manager-petition.component.css'],
})
export class ManagerPetitionComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  //*                                 unsubscribe                                */
  /* -------------------------------------------------------------------------- */
  _destroy$ = new Subject<void>();
  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private _studentService: StudentService) {}

  /* -------------------------------------------------------------------------- */
  //*                                 Life Circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  /* -------------------------------------------------------------------------- */
  //*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  // TODO : Form Group
  form = new FormGroup({
    prefix: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    student_code: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    major: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    address_details: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    company_details: new FormControl('', [Validators.required]),
  });

  // TODO : Dropdown
  dropdown: DropdownRole[] = MENU_DROPDOWN_PREFIX_STUDENT;

  /* -------------------------------------------------------------------------- */
  //*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */
  // TODO : create petition student form!
  onCreatePetition(): void {
    // console.log(this.form.value);
    this._studentService.createPetition(this.form.value);
  }
}
