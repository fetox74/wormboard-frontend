import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AggregateService} from '../../../service/aggregate.service';
import {ZWBAggregateCorp} from '../../../model/zwb-aggregate-corp';

@Component({
  selector: 'app-day-of-the-week-dialog',
  templateUrl: './day-of-the-week-dialog.component.html',
  styleUrls: ['./day-of-the-week-dialog.component.css']
})
export class DayOfTheWeekDialogComponent implements OnInit {
  public display = false;

  public data: any;
  public usTZcorrection = false;

  @Input()
  public selectedCorp: ZWBAggregateCorp;

  constructor(private aggregateService: AggregateService,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.data = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [
        {
          label: '# kills',
          backgroundColor: 'rgba(101, 200, 189, 0.55)',
          borderColor: '#53A69B',
          pointBackgroundColor: 'rgba(101, 200, 189, 0.55)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#53A69B',
          data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
          label: 'ISK in b',
          backgroundColor: 'rgba(89, 135, 140, 0.5)',
          borderColor: '#4f777b',
          pointBackgroundColor: 'rgba(89, 135, 140, 0.5)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#4f777b',
          data: [28, 48, 40, 19, 96, 27, 100]
        }
      ]
    };
  }

  public show() {
    this.display = true;
  }
}
