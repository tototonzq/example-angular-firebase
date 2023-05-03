import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

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
        // alert('บันทึกข้อมูลสําเร็จ');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `บันทึกข้อมูลสําเร็จ !`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        // alert('บันทึกข้อมูลไม่สําเร็จ');
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `บันทึกข้อมูลสําเร็จ !`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  // TODO : Get all petitions
  getAllPetition(): Observable<any> {
    return this._firestore.collection('create-petition').valueChanges();
  }
}
