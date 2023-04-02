import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DATA_TABLE } from '../show-data/show-data.data';
import * as database from '@angular/fire/database';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
})
export class AddDataComponent implements OnInit {
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private firestore: AngularFirestore) {}
  /* -------------------------------------------------------------------------- */
  /*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit() {
    this.GetAll();
  }

  /* -------------------------------------------------------------------------- */
  /*                                  variable                                  */
  /* -------------------------------------------------------------------------- */
  Category: string | null = '';
  Description: string | null = '';
  Gesture: string | null = '';
  Vdo: string | null = '';
  _data: any = [];

  /* -------------------------------------------------------------------------- */
  /*                                  functions                                 */
  /* -------------------------------------------------------------------------- */
  // Get
  GetAll(): void {
    this.firestore
      .collection('Vocabularies')
      .doc('สัตว์')
      .collection('vocab')
      .valueChanges()
      .subscribe((values) => {
        this._data = values;
        console.log(values);
        console.log(this._data);
      });
  }

  /* -------------------------------------------------------------------------- */
  /*                                      -                                     */
  /* -------------------------------------------------------------------------- */

  data2(): void {
    const data = this.firestore
      .collection('Vocabularies')
      .doc('สัตว์')
      .collection('vocab');
  }

  addData(): void {
    const data = {
      Category: this.Category,
      Description: this.Description,
      Gesture: this.Gesture,
      Vdo: this.Vdo,
    };
    this.firestore
      .collection('Vocabularies')
      .doc('สัตว์')
      .collection('vocab')
      .add(data)
      .then((res) => {
        console.log(res);
        this.data();
        this.resetForm();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  resetForm(): void {
    this.Category = '';
    this.Description = '';
    this.Gesture = '';
    this.Vdo = '';
  }

  /* -------------------------------------------------------------------------- */
  /*                                    Fake                                    */
  /* -------------------------------------------------------------------------- */
  data = DATA_TABLE;
}
