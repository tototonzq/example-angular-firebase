import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable, map } from 'rxjs';
import { TypePayload } from '../payload/payload.model';

@Injectable({
  providedIn: 'root',
})
export class PetitionService {
  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private _auth: AngularFireAuth,
    private _firestore: AngularFirestore,
    private _storage: AngularFireStorage
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
            const data = a.payload.doc.data() as TypePayload;
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
      .ref.where('is_approved_report', '==', payload);
  }
  DoApproveReportAdminPetition(payload: TypePayload) {
    const date = new Date();
    const time = date.getHours() + ':' + date.getMinutes();
    const date_time =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

    // console.log(date_time);
    // console.log(time);
    // console.log(payload);
    return this._firestore.collection('Petition').doc(payload.id).update({
      is_approved_admin_report: true,
      is_admin_date_approve: date_time,
      is_admin_time_approve: time,
    });
  }

  DoApproveCompanyPetition(payload: TypePayload) {
    const date = new Date();
    const time = date.getHours() + ':' + date.getMinutes();
    const date_time =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    console.log(payload);
    return this._firestore.collection('Petition').doc(payload.id).update({
      is_approved_company: true,
      is_company_date_approve: date_time,
      is_company_time_approve: time,
    });
  }

  DoApproveSuccessPetition(payload: TypePayload) {
    const date = new Date();
    const time = date.getHours() + ':' + date.getMinutes();
    const date_time =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    console.log(payload);
    return this._firestore.collection('Petition').doc(payload.id).update({
      is_approved_success: true,
      is_complete: true,
      is_petition_student_date_approve: date_time,
      is_petition_student_time_approve: time,
    });
  }

  DoCancelApprovePetition(payload: TypePayload, data?: TypePayload) {
    const date = new Date();
    const time = date.getHours() + ':' + date.getMinutes();
    const date_time =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    if (data === undefined) {
      return this._firestore.collection('Petition').doc(payload.id).update({
        is_approved_cancel: true,
        is_cancel_date_approve: date_time,
        is_cancel_time_approve: time,
        is_name_cancel: 'นาย กิตติคุณ นุผัด'
      });
    }
    return this._firestore.collection('Petition').doc(payload.id).update({
      is_approved_cancel: true,
      is_cancel_date_approve: date_time,
      is_cancel_time_approve: time,
      is_name_cancel: data[0].user,
    });
  }

  DoApproveReportPetition(payload: TypePayload, data: TypePayload) {
    const date = new Date();
    const timeNow = date.getHours() + ':' + date.getMinutes();
    const date_time =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    // console.log(payload);
    // console.log(data[0].user);
    return this._firestore.collection('Petition').doc(payload.id).update({
      is_approved_report: true,
      is_teacher_approve: data[0].user,
      is_time_approve: timeNow,
      is_date_approve: date_time,
    });
  }

  DoConfirmApprovePetition(payload: TypePayload) {
    const date = new Date();
    const time = date.getHours() + ':' + date.getMinutes();
    const date_time =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    this._firestore.collection('Petition').doc(payload.id).update({
      is_approved_success: true,
      is_approved_student_success: true,
      is_student_date_approve: date_time,
      is_student_time_approve: time,
    });
    // console.log(payload);
  }

  // TODO : Create Petition Form !
  createPetition(payload: TypePayload): void {
    const date = new Date();
    const time = date.getHours() + ':' + date.getMinutes();
    const date_time =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

    const data = {
      ...payload,
      is_petition_date_approve: date_time,
      is_petition_time_approve: time,
    };
    // console.log(payload);
    this._firestore.collection('Petition').add(data);
  }

  /* -------------------------------------------------------------------------- */
  /*                                    ////                                    */
  /* -------------------------------------------------------------------------- */
  DoResetToFalse(payload: TypePayload) {
    this._firestore.collection('Petition').doc(payload.id).update({
      is_approved_success: false,
      is_approved_cancel: false,
      is_approved_report: false,
      is_approved_company: false,
      is_approved_admin_report: false,
      is_approved_student_success: false,
      is_completed: false,
      url_response: '',
      url_courtesy: '',
      url_send: '',
    });
  }

  // TODO : Upload File
  DoUploadFilePDF(event: any, payload: TypePayload): void {
    // console.log(event);
    // console.log(payload);
    const file = event.target.files[0];
    const filePath = 'Petition/' + file.name;
    const fileRef = this._storage.ref(filePath);
    const task = this._storage.upload(filePath, file);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            console.log('File uploaded: ', url);
            // this.DoSetUrl(url, payload);
          });
        })
      )
      .subscribe();
  }

  DoDeletePetition(payload: TypePayload): void {
    console.log(payload);
    this._firestore.collection('Petition').doc(payload.id).delete();
  }

  DoUploadFileCourtesy(event: any, payload: TypePayload): void {
    // console.log(event);
    // console.log(payload);
    const file = event.target.files[0];
    const filePath = 'Petition/' + file.name;
    const fileRef = this._storage.ref(filePath);
    const task = this._storage.upload(filePath, file);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            // console.log('File uploaded: ', url);
            this.DoSetUrlCourtesy(url, payload);
          });
        })
      )
      .subscribe();
  }

  DoSetUrlCourtesy(url: TypePayload, payload: TypePayload): void {
    this._firestore.collection('Petition').doc(payload.id).update({
      url_courtesy: url,
    });
  }

  DoUploadFileResponse(event: any, payload: TypePayload): void {
    // console.log(event);
    // console.log(payload);
    const file = event.target.files[0];
    const filePath = 'Petition/' + file.name;
    const fileRef = this._storage.ref(filePath);
    const task = this._storage.upload(filePath, file);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            // console.log('File uploaded: ', url);
            this.DoSetUrlResponse(url, payload);
          });
        })
      )
      .subscribe();
  }

  DoSetUrlResponse(url: TypePayload, payload: TypePayload): void {
    this._firestore.collection('Petition').doc(payload.id).update({
      url_response: url,
    });
  }

  DoUploadFileSend(event: any, payload: TypePayload): void {
    // console.log(event);
    // console.log(payload);
    const file = event.target.files[0];
    const filePath = 'Petition/' + file.name;
    const fileRef = this._storage.ref(filePath);
    const task = this._storage.upload(filePath, file);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            // console.log('File uploaded: ', url);
            this.DoSetUrlSend(url, payload);
          });
        })
      )
      .subscribe();
  }

  DoSetUrlSend(url: TypePayload, payload: TypePayload): void {
    this._firestore.collection('Petition').doc(payload.id).update({
      url_send: url,
    });
  }

  // DoSetUrl(url: TypePayload, payload: TypePayload): void {
  //   this._firestore.collection('Petition').doc(payload.id).update({
  //     url_petition: url,
  //   });
  // }

  // TODO : Get all data with primary key !
  getAllPetitionWithUsername(payload?: any): Observable<any> {
    console.log(payload);
    return this._firestore.collection('Petition').valueChanges();
  }
  // getAllPetitionWithUsername(payload?: any): Observable<any> {
  //   console.log(payload);
  //   return this._firestore
  //     .collection('Petition')
  //     .doc('create-petition')
  //     .collection(payload)
  //     .snapshotChanges()
  //     .pipe(
  //       map((actions) =>
  //         actions.map((a) => {
  //           const data = a.payload.doc.data() as any;
  //           const id = a.payload.doc.id;
  //           // console.log({ id, ...data });
  //           return { id, ...data };
  //         })
  //       )
  //     );
  // }
}
