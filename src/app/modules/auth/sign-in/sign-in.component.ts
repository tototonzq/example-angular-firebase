import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  /* -------------------------------------------------------------------------- */
  /*                                  Variable                                  */
  /* -------------------------------------------------------------------------- */
  private isActiveAuth: boolean = false;
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private auth: AngularFireAuth, private router: Router) {}
  /* -------------------------------------------------------------------------- */
  /*                                 Life Circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit() {}
  /* -------------------------------------------------------------------------- */
  /*                                  Function                                  */
  /* -------------------------------------------------------------------------- */
  SignIn(email: string, password: string) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // SignUp
        this.isActiveAuth = true;
        alert('เข้าสู่ระบบสำเร็จ !');
        this.router.navigate(['dashboard']);
        // ...
      })
      .catch(() => {
        // SignUp Failed
        this.isActiveAuth = false;
        alert('กรุณากรอกข้อมูลที่ถูกต้อง !');
      });
  }
}
