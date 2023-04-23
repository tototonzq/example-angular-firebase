import { Injectable } from '@angular/core';
import { StateContext } from '@ngxs/store';
import { ManagerStateModel } from '../models/manager.state';
import { MENU_DROPDOWN_MANAGER_ADMIN } from '../../manager.data';

@Injectable({ providedIn: 'root' })
export class FindManagerEffect {
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor() {}

  find(
    { patchState, getState }: StateContext<ManagerStateModel>,
    { payload }: unknown[] | any
  ) {
    patchState({
      data_user: payload,
    });

    console.log(payload);
    console.log(MENU_DROPDOWN_MANAGER_ADMIN);

    const user = 'teacher';
    const data: any = getState().data_user.filter(
      (item: { username: any }) => item.username === user
    );
    console.log(data);

    const username = 'ต้น ต้น';
    const data2: any = payload.filter(
      (item: { username: any }) => item.username === username
    );
    console.log(data2);

    const username4 = 'ต้น ต้น';
    const data4: any = payload.find(
      (item: { username: any }) => item.username === username4
    )
    console.log(data4);

    const id = '00';
    const data3: any = MENU_DROPDOWN_MANAGER_ADMIN.find(
      (item: { id: any }) => item.id === id
    );
    console.log(data3);

    const id1 = '01';
    const data5: any = MENU_DROPDOWN_MANAGER_ADMIN.filter(
      (item: { id: any }) => item.id === id1
    );
    console.log(data5);

    console.log(payload);
  }
}
