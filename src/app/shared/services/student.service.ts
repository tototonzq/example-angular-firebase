import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

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

  // TODO : Create student form!
  createPetition(payload: any): void {
    this._firestore
      .collection('create-petition')
      // .doc(payload[0].username)
      .add(payload)
      .then(() => {
        alert('บันทึกข้อมูลสําเร็จ');
      })
      .catch(() => {
        alert('บันทึกข้อมูลไม่สําเร็จ');
      });
  }

  // TODO : Get all petitions
  getAllPetition(): Observable<any> {
    return this._firestore.collection('create-petition').valueChanges();
  }
}
