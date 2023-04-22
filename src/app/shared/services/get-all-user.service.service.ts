import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { GetAllResponse } from './models/payload.models';

@Injectable({
  providedIn: 'root',
})
export class GetAllUserService {
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  // TODO Get All User
  GetAllUser(): Observable<GetAllResponse> {
    return this.firestore.collection('users').valueChanges();
  }
}
