import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { UserDataModelResponse } from 'src/app/modules/auth/sign-in/store/models/sign-in.interface.model';
import { SignInSelectors } from 'src/app/modules/auth/sign-in/store/selectors/sign-in.selectors';
import { TypePayload } from 'src/app/shared/payload/payload.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  /* -------------------------------------------------------------------------- */
  //*                                 unsubscribe                                */
  /* -------------------------------------------------------------------------- */
  _destroy$ = new Subject<void>();

  /* -------------------------------------------------------------------------- */
  //*                                  Variable                                  */
  /* -------------------------------------------------------------------------- */
  public today = new Date(); // Get the current date
  @Output() toggleSidebar: EventEmitter<void> = new EventEmitter<void>();
  public data: TypePayload = JSON.parse(
    localStorage.getItem('userData') || '[]'
  );

  /* -------------------------------------------------------------------------- */
  //*                                   Select                                   */
  /* -------------------------------------------------------------------------- */
  @Select(SignInSelectors.getDataUserLogin) getDataUserLogin$!: Observable<
    UserDataModelResponse | TypePayload
  >;

  /* -------------------------------------------------------------------------- */
  //*                                 Life Circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    this.getDataUserLogin$.subscribe((response) => {
      if (response === null) return;
      //* Save the updated data to localStorage
      this.data.push(...response);
      localStorage.setItem('userData', JSON.stringify(this.data));
      console.log(this.data);
    });
  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
    localStorage.removeItem('userData');
  }
  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */
  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

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
