import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SignInSelectors } from 'src/app/modules/auth/sign-in/store/selectors/sign-in.selectors';
import { TypePayload } from 'src/app/shared/payload/payload.model';
import { AuthUserService } from 'src/app/shared/services/auth-user.service';
import { PetitionService } from 'src/app/shared/services/petition.service';

// TODO :  Library Import
import Swal from 'sweetalert2';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { GeneratePdfService } from 'src/app/shared/services/generate-pdf.service';

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
    number | TypePayload
  >;

  /* -------------------------------------------------------------------------- */
  //*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  // public data: TypePayload = JSON.parse(
  //   localStorage.getItem('userDataAdminDashboard') || '[]'
  // );
  public user_count$ = new BehaviorSubject<number>(0);
  public user_count_student$ = new BehaviorSubject<number>(0);
  public user_count_teacher$ = new BehaviorSubject<number>(0);
  public user_count_admin$ = new BehaviorSubject<number>(0);
  public isChecked$ = new BehaviorSubject<boolean>(false);

  /* -------------------------------------------------------------------------- */
  //*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private _authUserService: AuthUserService,
    private _petitionService: PetitionService,
    private _generatePdfService: GeneratePdfService
  ) {}

  /* -------------------------------------------------------------------------- */
  //*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  public is_approved_report$ = new BehaviorSubject<TypePayload[]>([]);
  public isLoadingUpload$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private text$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  /* -------------------------------------------------------------------------- */
  //*                                 Life Circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    this._petitionService.DoGetAllPetitionWithID().subscribe((response) => {
      // console.log(response);
      this.is_approved_report$.next(
        response.filter(
          (x) =>
            x.is_approved_cancel === false &&
            x.is_approved_success === false &&
            x.is_approved_company === false &&
            x.is_approved_report === true &&
            x.is_approved_admin_report === false
        )
      );
      console.log(this.is_approved_report$.value);
      console.log(response[0].surname);
      this.text$.next(response[0].surname);
      console.log(this.text$.value);
    });
    // this.getCountUserAll$.pipe().subscribe((response) => {
    //   if (response === null) return;
    //   //* Save the updated data to localStorage
    //   this.data.push(response);
    //   localStorage.setItem('userDataAdminDashboard', JSON.stringify(this.data));
    // });
    // console.log(this.data);
    //* Injector get users
    this._authUserService.getAllUser().subscribe((response) => {
      // TODO : get users
      this.user_count$.next(response.length);
      // console.log(response);

      // TODO : get admins
      const count_admin: TypePayload = response.filter(
        (item: TypePayload) => item.role === 'admin'
      );
      // console.log(count_admin);
      this.user_count_admin$.next(count_admin.length);

      // TODO : get students
      const count_student: TypePayload = response.filter(
        (item: TypePayload) => item.role === 'student'
      );
      // console.log(count_student);
      this.user_count_student$.next(count_student.length);

      // TODO : get teachers
      const count_teacher: TypePayload = response.filter(
        (item: TypePayload) => item.role === 'teacher'
      );
      // console.log(count_teacher);
      this.user_count_teacher$.next(count_teacher.length);

      //! Checked
      this.isChecked$.next(true);
    });
  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
    //TODO : Remove the data from localStorage
    // localStorage.removeItem('userDataAdminDashboard');
  }

  /* -------------------------------------------------------------------------- */
  //*                                  FUnctions                                 */
  /* -------------------------------------------------------------------------- */
  DoApproveReportPetition(item: TypePayload) {
    // console.log(item);
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่ว่าต้องการอนุมัติ?',
      text: 'แตะที่อื่นเพื่อยกเลิกการทำงาน!',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'ใช่, อนุมัติ!',
    }).then((result) => {
      if (item.url_courtesy.length < 5) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: `กรุณาอัปโหลดข้อมูล !`,
          showConfirmButton: false,
          timer: 1200,
        });
        return;
      } else if (result.value) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `อนุมัติสำเร็จ`,
          showConfirmButton: false,
          timer: 1200,
        });
        this._petitionService.DoApproveReportAdminPetition(item);
      }
    });
  }

  DoCancelApprovePetition(item: TypePayload) {
    // console.log(item);
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่ว่าต้องการปฏิเสธ?',
      text: 'แตะที่อื่นเพื่อยกเลิกการทำงาน!',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'ใช่, ปฏิเสธ!',
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `อนุมัติสำเร็จ`,
          showConfirmButton: false,
          timer: 1200,
        });
        this._petitionService.DoCancelApprovePetition(item);
      }
    });
  }

  DoUploadFilePetition(item: TypePayload): void {
    // console.log(item);
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/pdf';
    fileInput.hidden = true;
    fileInput.addEventListener('change', (event: Event) => {
      this.isLoadingUpload$.next(true);
      this._petitionService.DoUploadFileCourtesy(event, item);
      setTimeout(() => {
        this.isLoadingUpload$.next(false);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `อัพโหลดสําเร็จ`,
          showConfirmButton: false,
          timer: 1200,
        });
      }, 1000);
    });
    fileInput.click();
  }

  /* -------------------------------------------------------------------------- */
  //*                                  Make PDF                                  */
  /* -------------------------------------------------------------------------- */
  // * Create PDF maker
  DoExportPDF(item: TypePayload) {
    console.log(item);
    this._generatePdfService.DoExportPDF(item)
  }
  // DoExportPDF() {
  //   alert('สร้าง PDF สําเร็จ');
  //   (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  //   (window as any).pdfMake.fonts = {
  //     THSarabunNew: {
  //       normal: 'THSarabunNew.ttf',
  //       bold: 'THSarabunNew Bold.ttf',
  //       italics: 'THSarabunNew Italic.ttf',
  //       bolditalics: 'THSarabunNew BoldItalic.ttf',
  //     },
  //     Roboto: {
  //       normal: 'Roboto-Regular.ttf',
  //       bold: 'Roboto-Medium.ttf',
  //       italics: 'Roboto-Italic.ttf',
  //       bolditalics: 'Roboto-MediumItalic.ttf',
  //     },
  //   };
  //   const content: any = {
  //     header: {},
  //     content: [
  //       {
  //         text: 'ทดสอบการสร้าง pdf ' + this.text$.value,
  //         fontSize: 18,
  //         alignment: 'center',
  //       },
  //     ],
  //     defaultStyle: {
  //       font: 'THSarabunNew',
  //     },
  //     watermark: {
  //       text: 'ลายน้ำแบบคาด',
  //       color: 'blue',
  //       opacity: 0.1,
  //       bold: true,
  //     },
  //   };
  //   pdfMake.createPdf(content).open();
  // }
}
