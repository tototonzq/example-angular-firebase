import { Component, OnInit } from '@angular/core';

@Component({
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
