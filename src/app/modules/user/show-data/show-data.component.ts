import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DATA_TABLE } from './show-data.data';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.scss'],
})
export class ShowDataComponent implements OnInit {
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor() {}
  /* -------------------------------------------------------------------------- */
  /*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit() {}

  /* -------------------------------------------------------------------------- */
  /*                                  Fake Data                                 */
  /* -------------------------------------------------------------------------- */
  data = DATA_TABLE;
}
