import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { SignInSelectors } from 'src/app/modules/auth/sign-in/store/selectors/sign-in.selectors';
import { AuthUserService } from 'src/app/shared/services/auth/auth-user.service';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.css'],
})
export class DashboardListComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  //*                                 unsubscribe                                */
  /* -------------------------------------------------------------------------- */
  _destroy$ = new Subject<void>();

  /* -------------------------------------------------------------------------- */
  //*                                   Select                                   */
  /* -------------------------------------------------------------------------- */
  @Select(SignInSelectors.getCountUserAll) getCountUserAll$!: Observable<
    number | any
  >;

  /* -------------------------------------------------------------------------- */
  //*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  // public data: any = JSON.parse(
  //   localStorage.getItem('userDataAdminDashboard') || '[]'
  // );
  public user_count: any = 0;
  public user_count_student: any = 0;
  public user_count_teacher: any = 0;
  public user_count_admin: any = 0;
  public isChecked: boolean = false;

  /* -------------------------------------------------------------------------- */
  //*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private _authUserService: AuthUserService) {}

  /* -------------------------------------------------------------------------- */
  //*                                 Life Circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    // this.getCountUserAll$.pipe().subscribe((response) => {
    //   // console.log(response);
    //   if (response === null) return;
    //   //* Save the updated data to localStorage
    //   this.data.push(response);
    //   localStorage.setItem('userDataAdminDashboard', JSON.stringify(this.data));
    // });
    // console.log(this.data);
    //* Injector get users
    this._authUserService.getAllUser().subscribe((response) => {
      // TODO : get users
      this.user_count = response.length;
      // console.log(response);

      // TODO : get admins
      const count_admin: any = response.filter(
        (item: any) => item.role === 'admin'
      );
      // console.log(count_admin);
      this.user_count_admin = count_admin.length;

      // TODO : get students
      const count_student: any = response.filter(
        (item: any) => item.role === 'student'
      );
      // console.log(count_student);
      this.user_count_student = count_student.length;

      // TODO : get teachers
      const count_teacher: any = response.filter(
        (item: any) => item.role === 'teacher'
      );
      // console.log(count_teacher);
      this.user_count_teacher = count_teacher.length;

      //! Checked
      this.isChecked = true;
    });
  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    //TODO : Remove the data from localStorage
    // localStorage.removeItem('userDataAdminDashboard');
  }
}
