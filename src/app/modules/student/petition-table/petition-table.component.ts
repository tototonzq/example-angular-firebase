import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { TypePayload } from 'src/app/shared/payload/payload.model';
import { PetitionService } from 'src/app/shared/services/petition.service';

@Component({
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./petition-table.component.css'],
})
export class PetitionTableComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {}
  ngOnInit(): void {}
}
