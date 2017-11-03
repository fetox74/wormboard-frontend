import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent implements OnInit {
  public display = false;

  public message: string;

  constructor() { }

  ngOnInit() {
  }

  public show(message: string) {
    this.message = message;
    this.display = true;
  }
}
