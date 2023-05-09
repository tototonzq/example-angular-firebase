import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { GetAllListResponse } from './models/payload.models';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private _auth: AngularFireAuth,
    private _firestore: AngularFirestore
  ) {}
  /* -------------------------------------------------------------------------- */
  //*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */
  // TODO : get all user !
  getAllUser(): Observable<any> {
    return this._firestore.collection('users').valueChanges();
  }

  // TODO : delete user with username !
  delete(payload: any): void {
    // console.log(item);
    this._firestore
      .collection('users')
      .doc(payload.username)
      .delete()
      .then(() => {
        // alert('ลบข้อมูลสําเร็จ');
      });
  }

  // TODO : edit user !
  // edit(payload: any): void {
  //   this._firestore.collection('users').doc(payload.username).update(payload);
  // }

  // TODO : detail user !
  // detail(payload: any): void {
  // }
}
