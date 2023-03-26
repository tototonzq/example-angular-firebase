import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private auth: AngularFireAuth, private router: Router) {}

  /* -------------------------------------------------------------------------- */
  /*                                 Life Circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit() {}
  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */
  SignIn(email: string, password: string) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // SignUp
        alert('เข้าสู่ระบบสำเร็จ !');
        this.router.navigate(['test']);
        // ...
      })
      .catch(() => {
        // SignUp Failed
        alert('กรุณากรอกข้อมูลที่ถูกต้อง !');
      });
  }
}
