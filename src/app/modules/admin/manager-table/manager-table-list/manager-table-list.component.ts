import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GetAllUserService } from 'src/app/shared/services/get-all-user.service.service';
import { Find } from '../../manager/store/actions/find-manager.action';
import { Observable } from 'rxjs';
import { ManagerSelector } from '../../manager/store/selectors/manager.selectors';

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

  /* -------------------------------------------------------------------------- */
  //*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private _getAllUserService: GetAllUserService,
    private _store: Store
  ) {}
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
}
