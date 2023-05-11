import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetitionService {
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
  DoGetAllPetitionWithID() {
    return this._firestore
      .collection('Petition')
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

  DoGetAllPetitionReportWithKey(payload: boolean) {
    // console.log(payload);
    return this._firestore
      .collection('Petition')
      .ref.where('status_approved_report', '==', payload);
  }

  DoApprovePetition(payload: any) {
    // console.log(payload);
    return this._firestore.collection('Petition').doc(payload.id).update({
      status_approved_report: true,
    });
  }

  DoCancelApprovePetition(payload: any) {
    // console.log(payload);
    return this._firestore.collection('Petition').doc(payload.id).update({
      is_cancel: true,
    });
  }

  DoConfirmApprovePetition(payload: any) {
    this._firestore.collection('Petition').doc(payload.id).update({
      is_success: true,
    });
    console.log(payload);
  }
}
