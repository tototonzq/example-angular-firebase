import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { LayoutSelectors } from '../../store/selectors/layout.selector';
import { Observable } from 'rxjs';
import { RoleType } from 'src/app/shared/types/role.type';
import { Layout } from '../../store/models/layout.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() isOpen: boolean = true;

  @Select(LayoutSelectors.role) role$!: Observable<RoleType>;
  @Select(LayoutSelectors.layout) layout$!: Observable<Layout>;

  /* -------------------------------------------------------------------------- */
  /*                                  Variable                                  */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private router: Router) {}
  /* -------------------------------------------------------------------------- */
  /*                                 Life Circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {}
  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */
  click(item?: any) {
    // if (role === 'user') {
    // } else {
    //   this.router.navigate(['sign-in']);
    // }
    this.router.navigate([item]);
  }

  exit(): void {
    this.router.navigate(['sign-in']);
  }
}
