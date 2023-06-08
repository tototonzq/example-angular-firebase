import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TypePayload } from 'src/app/shared/payload/payload.model';
import { PetitionService } from 'src/app/shared/services/petition.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-manager',
  templateUrl: './company-manager.component.html',
  styleUrls: ['./company-manager.component.css'],
})
export class CompanyManagerComponent implements OnInit {
  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private _petitionService: PetitionService) {}

  /* -------------------------------------------------------------------------- */
  //*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  public data$ = new BehaviorSubject<any[]>([]);
  public data_user_report_success$ = new BehaviorSubject<any[]>([]);

  public searchFilter: string = '';

  // boolean
  public isLoading: boolean = false;
  // public isLoadingUpload: boolean = false;
  public isLoadingUpload$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isError: boolean = false;
  public isSuccess: boolean = false;
  public isEmpty: boolean = false;

  /* -------------------------------------------------------------------------- */
  //*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit() {
    this._petitionService.DoGetAllPetitionWithID().subscribe((response) => {
      this.data$.next(response);
      console.log(response);
      this.data_user_report_success$.next(
        this.data$.value.filter(
          (x) =>
            x.is_approved_admin_report === true &&
            x.is_approved_cancel === false &&
            x.is_approved_success === false &&
            x.is_approved_company === false &&
            x.is_approved_report === true
        )
      );
    });
  }

  /* -------------------------------------------------------------------------- */
  //*                                  functions                                 */
  /* -------------------------------------------------------------------------- */
  DoApproveCompanyPetition(item: TypePayload): void {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่ว่าต้องการอนุมัติ?',
      text: 'แตะที่อื่นเพื่อยกเลิกการทำงาน!',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'ใช่, อนุมัติ!',
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `อนุมัติสำเร็จ`,
          showConfirmButton: false,
          timer: 1200,
        });
        // this._petitionService.DoApproveCompanyPetition(item);
        this._petitionService.DoApproveCompanyPetition(item);
      }
    });
  }
  // DoCancelApproveCompanyPetition(item: TypePayload): void {
  //   this._petitionService.DoCancelApprovePetition(item);
  // }
  DoCancelApproveCompanyPetition(item: TypePayload) {
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
    // Swal.fire({
    //   title: 'คุณแน่ใจหรือไม่ว่าต้องการปฏิเสธ?',
    //   text: 'แตะที่อื่นเพื่อยกเลิกการทำงาน!',
    //   icon: 'warning',
    //   showCancelButton: false,
    //   confirmButtonColor: '#3085d6',
    //   confirmButtonText: 'ใช่, ปฏิเสธ!',
    // }).then((result) => {
    //   if (item.url_response.length < 5) {
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'warning',
    //       title: `กรุณาอัปโหลดข้อมูล !`,
    //       showConfirmButton: false,
    //       timer: 1200,
    //     });
    //     return;
    //   } else if (result.value) {
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'success',
    //       title: `อนุมัติสำเร็จ`,
    //       showConfirmButton: false,
    //       timer: 1200,
    //     });
    //     this._petitionService.DoCancelApprovePetition(item);
    //   }
    // });
  }

  DoUploadFilePetitionResponse(item: TypePayload): void {
    // console.log(item);
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/pdf';
    fileInput.hidden = true;
    fileInput.addEventListener('change', (event: Event) => {
      this.isLoadingUpload$.next(true);
      this._petitionService.DoUploadFileResponse(event, item);
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
}
