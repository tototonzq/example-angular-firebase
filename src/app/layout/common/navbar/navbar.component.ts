import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  /* -------------------------------------------------------------------------- */
  /*                                   @input                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                  Variable                                  */
  /* -------------------------------------------------------------------------- */
  public today = new Date(); // Get the current date
  @Output() toggleSidebar: EventEmitter<void> = new EventEmitter<void>();

  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor() {}
  /* -------------------------------------------------------------------------- */
  /*                                 Life Circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit() {}
  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */
  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }
}
