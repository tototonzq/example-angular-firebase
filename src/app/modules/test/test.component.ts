import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  constructor(public store: AngularFirestore) {}

  ngOnInit() {}

  GetAllData(): void {
    this.store
      .collection('Vocabularies')
      .doc('สัตว์')
      .collection('vocab')
      .valueChanges()
      .subscribe((values) => {
        console.log(values);
      });
  }
}
