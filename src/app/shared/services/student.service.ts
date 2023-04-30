import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private _auth: AngularFireAuth,
    private _firestore: AngularFirestore
  ) {}

  /* -------------------------------------------------------------------------- */
  //*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  // TODO : create student form!
  createPetition(payload: any): void {
    // console.log(payload);
    this._firestore
      .collection('create-petition')
      .doc('1')
      .set(payload)
      .then(() => {
        alert('บันทึกข้อมูลสําเร็จ');
      })
      .catch(() => {
        alert('บันทึกข้อมูลไม่สําเร็จ');
      });
  }
}
