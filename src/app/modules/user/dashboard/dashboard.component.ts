import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(public store: AngularFirestore) {}

  ngOnInit() {
    this.GetAllData();
  }
  public data_db1: any[] = [];
  public _sidebarOpen: boolean = false;

  public today = new Date(); // Get the current date

  onToggleSidebar() {
    this._sidebarOpen = !this._sidebarOpen;
  }
  GetAllData(): void {
    this.store
      .collection('Vocabularies')
      .doc('สัตว์')
      .collection('vocab')
      .valueChanges()
      .subscribe((querySnapshot) => {
        // var data_db1 = [];
        querySnapshot.forEach((doc) => {
          this.data_db1.push(doc);
          console.log(doc);
          console.log(this.data_db1);
        });
      });
  }

  AddAllItemToTable() {
    console.log(this.data_db1);
    const sdtNo: number = 0;
  }
}
