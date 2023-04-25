import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GetAllUserService } from 'src/app/shared/services/get-all-user.service.service';
import { Find } from '../../manager/store/actions/find-manager.action';
import { Observable } from 'rxjs';
import { ManagerSelector } from '../../manager/store/selectors/manager.selectors';
import { SignInSelectors } from 'src/app/modules/auth/sign-in/store/selectors/sign-in.selectors';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-manager-table-list',
  templateUrl: './manager-table-list.component.html',
  styleUrls: ['./manager-table-list.component.css'],
})
export class ManagerTableListComponent implements OnInit {
  /* -------------------------------------------------------------------------- */
  //*                                   Select                                   */
  /* -------------------------------------------------------------------------- */
  @Select(ManagerSelector.data) data$!: Observable<unknown[] | any>;
  @Select(SignInSelectors.getCountUserAll) getCountUserAll$!: Observable<
    number | any
  >;

  /* -------------------------------------------------------------------------- */
  //*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private _getAllUserService: GetAllUserService,
    private _store: Store,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  /* -------------------------------------------------------------------------- */
  //*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  public isChecked: boolean = false;
  /* -------------------------------------------------------------------------- */
  //*                                 Life Circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit() {
    // ! Injector users
    this._getAllUserService
      .GetAllUser()
      .pipe()
      .subscribe((res) => {
        this._store.dispatch(new Find(res));
        this.isChecked = true;
      });
  }
  /* -------------------------------------------------------------------------- */
  //*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */
  // TODO : get role required
  getRole(role: string) {
    const _role = role;
    if (_role === 'admin') {
      return 'ผู้ดูแลระบบ';
    }
    if (_role === 'teacher') {
      return 'อาจารย์';
    }
    if (_role === 'student') {
      return 'นิสิต';
    }
    return;
  }

  // TODO : delete users with username
  delete(item: any): void {
    // console.log(item);
    this.firestore
      .collection('users')
      .doc(item.username)
      .delete()
      .then(() => {
        // alert('ลบข้อมูลสําเร็จ');
      });
  }
}
