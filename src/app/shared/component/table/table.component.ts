import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Injector,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  /* -------------------------------------------------------------------------- */
  /*                                    Input                                   */
  /* -------------------------------------------------------------------------- */
  @Input() data: any[] = [];
  @Input() showClearSort: boolean = false;

  /* -------------------------------------------------------------------------- */
  /*                                   Output                                   */
  /* -------------------------------------------------------------------------- */
  @Output() clickRow: EventEmitter<any> = new EventEmitter<any>();

  /* -------------------------------------------------------------------------- */
  /*                                Content Child                               */
  /* -------------------------------------------------------------------------- */
  @ContentChild('headers') headers!: TemplateRef<any>;
  @ContentChild('rows') rows!: TemplateRef<any>;
  @ContentChild('noData') noData!: TemplateRef<any>;

  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  rowsDefault: any[] = [];
  rowsClone: any[] = [];

  /* -------------------------------------------------------------------------- */
  /*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private cdr: ChangeDetectorRef,
    public readonly injector: Injector
  ) {}

  /* -------------------------------------------------------------------------- */
  /*                               Logic Functions                              */
  /* -------------------------------------------------------------------------- */
  sortHeaderByKey(key: string): void {
    let cloneRowsSort: any[] = JSON.parse(JSON.stringify(this.rowsClone));
    const cloneRowsCompare: any[] = JSON.parse(JSON.stringify(this.rowsClone));

    const typeValue = typeof cloneRowsSort[0][key];

    switch (typeValue) {
      case 'string':
        cloneRowsSort.sort((a, b) => a[key].localeCompare(b[key]));
        if (
          JSON.stringify(cloneRowsSort) === JSON.stringify(cloneRowsCompare)
        ) {
          cloneRowsSort.sort((a, b) => b[key].localeCompare(a[key]));
        }
        break;
      case 'number':
        cloneRowsSort.sort((a, b) => a[key] - b[key]);
        if (
          JSON.stringify(cloneRowsSort) === JSON.stringify(cloneRowsCompare)
        ) {
          cloneRowsSort.sort((a, b) => b[key] - a[key]);
        }
        break;
      default:
        return;
    }

    this.rowsClone = cloneRowsSort;
    this.cdr.markForCheck();
  }

  resetSort(): void {
    this.rowsClone = JSON.parse(JSON.stringify(this.rowsDefault));
    this.cdr.markForCheck();
  }

  trackByRow(index: number, item: any) {
    return index;
  }

  trackByTd(index: number, item: any) {
    return index;
  }

  /* -------------------------------------------------------------------------- */
  /*                              Get Set Functions                             */
  /* -------------------------------------------------------------------------- */
  getKeyRow(row: any): string[] {
    return Object.keys(row);
  }
}
