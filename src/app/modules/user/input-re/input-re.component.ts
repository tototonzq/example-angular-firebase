import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-re',
  templateUrl: './input-re.component.html',
  styleUrls: ['./input-re.component.scss'],
})
export class InputReComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  myData = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    { id: 3, name: 'Bob', age: 40 },
  ];
}
