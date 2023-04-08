import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DATA_TABLE } from '../show-data/show-data.data';
import { DropdownModels } from './store/models/add-data.model';
import { FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
})
export class AddDataComponent implements OnInit {
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private firestore: AngularFirestore,
    private _toastService: ToastService
  ) {}
  /* -------------------------------------------------------------------------- */
  /*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit() {
    this.GetAll();
    this.dropdownData.valueChanges.subscribe((res) => {
      if (res !== '') {
        this.isCheckValidator = false;
      }
      this.GetAll(res);
      this.Delete(res);
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                                  variable                                  */
  /* -------------------------------------------------------------------------- */
  Category: any | null = '';
  Description: any | null = '';
  Gesture: any | null = '';
  Vdo: any | null = '';
  isCheckEditMode: boolean = false;
  isCheckValidator: boolean = false;

  _data: any = [];
  dropdownData = new FormControl('', [Validators.required]);

  /* -------------------------------------------------------------------------- */
  /*                                  functions                                 */
  /* -------------------------------------------------------------------------- */
  /* --------------------------------- // Get --------------------------------- */
  // ---- Get All Document
  GetAll(category?: any): void {
    this.firestore
      .collection('Vocabularies')
      .doc(category)
      .collection('vocab')
      .valueChanges()
      .subscribe((values) => {
        this._data = values;
      });
  }

  /* -------------------------------- // Delete ------------------------------- */
  // ---- Delete Document
  Delete(item?: any, category?: any): void {
    this.firestore
      .collection('Vocabularies')
      .doc(category)
      .collection('vocab')
      .doc(item.Gesture)
      .delete()
      .then(() => {
        this.resetForm();
        this.isCheckEditMode = false;
        // alert('Data delete successfully!');
      })
      .catch((error) => {
        alert(`Error adding data: ${error}`);
      });
  }

  /* ----------------------------- // Add Document ---------------------------- */
  // ---- Add Document With Auto Generated ID
  // add(): void {
  //   const data = {
  //     Category: this.Category,
  //     Description: this.Description,
  //     Gesture: this.Gesture,
  //     Vdo: this.Vdo,
  //   };
  //   this.firestore
  //     .collection('Vocabularies')
  //     .doc('สัตว์')
  //     .collection('vocab')
  //     .add(data)
  //     .then((res) => {
  //       this.data();
  //       this.resetForm();
  //     })
  //     .catch((e) => {
  //     });
  // }

  // ---- Add Document With Customer ID
  add(category?: any): void {
    if (category === '') {
      // alert('กรุณาเลือก Category');
      this.checkValidator();
    }
    const data: any = {
      Category: this.dropdownData.value?.trim(),
      Description: this.Description.trim(),
      Gesture: this.Gesture.trim(),
      Vdo: this.Vdo.trim(),
    };
    this.firestore
      .collection('Vocabularies')
      .doc(category)
      .collection('vocab')
      .doc(data.Gesture)
      .set(data)
      .then(() => {
        console.log(data);
        this.resetForm();
        this.isCheckEditMode = false;
        // alert('Data added successfully!');
      })
      .catch((error) => {
        alert(`Error adding data: ${error}`);
      });
  }

  /* -------------------------------------------------------------------------- */
  /*                                // Pull Data                                */
  /* -------------------------------------------------------------------------- */
  // ---- Pull Fields inside a Document
  pull(item: any, category?: any): void {
    this.firestore
      .collection('Vocabularies')
      .doc(category)
      .collection('vocab')
      .doc(item.Gesture)
      .get()
      .subscribe((res) => {
        this.isCheckEditMode = true;
        if (res.exists) {
          this.Gesture = item.Gesture;
          this.Description = item.Description;
          this.Vdo = item.Vdo;
          this.Category = item.Category;
        }
      });
  }

  /* -------------------------------------------------------------------------- */
  /*                               // Search Data                               */
  /* -------------------------------------------------------------------------- */
  // ---- Search Fields inside a Document
  Search(category?: any): void {
    if (this.Gesture === '') {
      return this.GetAll(category);
    }
    this.firestore
      .collection('Vocabularies')
      .doc(category)
      .collection('vocab')
      .doc(this.Gesture)
      .valueChanges()
      .subscribe((res) => {
        if (res === undefined) {
          alert('ไม่พบข้อมูล');
          return;
        }
        this._data = [res];
        this.resetForm();
      });
  }

  /* ------------------------------ // Reset Form ----------------------------- */
  // ----  Reset Form After Add Document
  resetForm(): void {
    this.Category = '';
    this.Description = '';
    this.Gesture = '';
    this.Vdo = '';
  }

  checkValidator() {
    this.isCheckValidator = true;
  }

  /* -------------------------------------------------------------------------- */
  /*                                    Fake                                    */
  /* -------------------------------------------------------------------------- */
  data = DATA_TABLE;

  dropdown: DropdownModels[] = [
    { id: 1, value: 'ครอบครัว' },
    { id: 2, value: 'ความรู้สึก' },
    { id: 3, value: 'ตัวเลข' },
    { id: 4, value: 'ผลไม้' },
    { id: 5, value: 'ผัก' },
    { id: 6, value: 'ร่างกาย' },
    { id: 7, value: 'สระ วรรณยุกต์' },
    { id: 8, value: 'สัตว์' },
    { id: 9, value: 'สี' },
    { id: 10, value: 'อักษรไทย' },
    { id: 11, value: 'เวลา' },
    { id: 12, value: 'โควิด 19' },
  ];
}
