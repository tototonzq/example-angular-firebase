import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private _auth: AngularFireAuth,
    private _firestore: AngularFirestore
  ) {}
  /* -------------------------------------------------------------------------- */
  //*                                  functions                                 */
  /* -------------------------------------------------------------------------- */
  // TODO : Set petition round
  changeRoundPetition(payload: any) {
    this._firestore
      .collection('student-petition')
      // .doc(payload.round_petition)
      .doc('round')
      .set(payload);
  }

  // TODO : Get petition round
  getRoundPetition(payload?: any) {
    return this._firestore
      .collection('student-petition')
      .doc('round')
      .valueChanges();
  }
}
