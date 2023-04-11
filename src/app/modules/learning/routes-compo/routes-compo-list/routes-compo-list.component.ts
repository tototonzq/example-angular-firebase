import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-routes-compo-list',
  templateUrl: './routes-compo-list.component.html',
  styleUrls: ['./routes-compo-list.component.scss'],
})
export class RoutesCompoListComponent implements OnInit {
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private _router: Router, private _route: ActivatedRoute) {}
  /* -------------------------------------------------------------------------- */
  /*                                 Life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit() {}
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  myData = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    { id: 3, name: 'Bob', age: 40 },
  ];
  /* -------------------------------------------------------------------------- */
  /*                                 Functions                                  */
  /* -------------------------------------------------------------------------- */
  click(): void {
    this._router.navigate(['./add'], {
      relativeTo: this._route,
      replaceUrl: true,
    });
    // this._cdr.detectChanges();
  }
}
