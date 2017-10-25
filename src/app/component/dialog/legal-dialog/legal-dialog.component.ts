import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-legal-dialog',
  templateUrl: './legal-dialog.component.html',
  styleUrls: ['./legal-dialog.component.scss']
})
export class LegalDialogComponent implements OnInit {
  public display = false;

  constructor() { }

  ngOnInit() {
  }
}
