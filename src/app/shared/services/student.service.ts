import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
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
      .collection('student-petition')
      .doc('create-petition')
      // .doc(payload[0].username)
      .collection(payload[0])
      .add(payload)
      .then(() => {
        // console.log(payload);
        // alert('บันทึกข้อมูลสําเร็จ');
        // Swal.fire({
        //   position: 'center',
        //   icon: 'success',
        //   title: `บันทึกข้อมูลสําเร็จ !`,
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
      })
      .catch(() => {
        // alert('บันทึกข้อมูลไม่สําเร็จ');
        // Swal.fire({
        //   position: 'center',
        //   icon: 'error',
        //   title: `บันทึกข้อมูลสําเร็จ !`,
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
      });
  }

  /* -------------------------------------------------------------------------- */
  //*                                  GET DATA                                  */
  /* -------------------------------------------------------------------------- */
  // TODO : Get all petitions normal !
  // getAllPetition(payload?: any): Observable<any> {
  //   return this._firestore
  //     .collection('student-petition')
  //     .doc('create-petition')
  //     .collection(payload)
  //     .valueChanges();
  // }
  // TODO : Get all data with primary key !
  getAllPetition(payload?: any): Observable<any> {
    return this._firestore
      .collection('student-petition')
      .doc('create-petition')
      .collection(payload)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            // console.log({ id, ...data });
            return { id, ...data };
          })
        )
      );
  }

  /* -------------------------------------------------------------------------- */
  //*                                   DELETE                                   */
  /* -------------------------------------------------------------------------- */
  // TODO : Delete petition
  deletePetition(payload: any) {
    console.log(payload[0]);
    // this._firestore.collection('create-petition').doc(payload.id).delete();
    this._firestore
      .collection('student-petition')
      .doc('create-petition')
      .collection(payload[0])
      .doc(payload.id)
      .delete();
  }

  /* -------------------------------------------------------------------------- */
  //*                                   CANCEL                                   */
  /* -------------------------------------------------------------------------- */
  // TODO : Cancel petition
  cancelPetition(payload: any) {
    console.log(payload);
    const data = {
      ...payload,
      is_cancel: true,
      status_approved_company: false,
      status_approved_report: false,
    };
    this._firestore
      .collection('student-petition')
      .doc('create-petition')
      .collection(payload[0])
      .doc(payload.id)
      .update(data);
  }

  // DELETE PETITION
  // deletePetition(payload: any) {
  //   console.log(payload);
  //   this._firestore
  //     .collection('create-petition')
  //     .ref.where('0', '==', 'student')
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         doc.ref
  //           .delete()
  //           .then(() => {
  //             console.log('Document successfully deleted!');
  //           })
  //           .catch((error) => {
  //             console.error('Error removing document: ', error);
  //           });
  //       });
  //     })
  //     .catch((error) => {
  //       console.error('Error getting documents: ', error);
  //     });
  // }
}
