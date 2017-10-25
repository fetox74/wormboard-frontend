import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AggregateService} from '../../../service/aggregate.service';
import {ZWBAggregateCorp} from '../../../model/zwb-aggregate-corp';
import {monthNum} from '../../app.component';

@Component({
  selector: 'app-active-chars-dialog',
  templateUrl: './active-chars-dialog.component.html',
  styleUrls: ['./active-chars-dialog.component.scss'],
  providers: [AggregateService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveCharsDialogComponent implements OnInit {
  public display = false;

  public activeCharData: any;

  @Input()
  public selectedCorp: ZWBAggregateCorp;

  @Input()
  public selectedPeriod: string;

  @Input()
  public selectedYear: string;

  constructor(private aggregateService: AggregateService,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  show() {
    switch (this.selectedPeriod) {
      case 'ALL':
        this.aggregateService.getActiveCharStatsForYear(this.selectedCorp.corporationid, this.selectedYear)
          .first()
          .subscribe(activeCharData => {
            this.activeCharData = activeCharData;
            this.display = true;
            this.changeDetectorRef.markForCheck();
          });
        break;
      case 'Jan':
      case 'Feb':
      case 'Mar':
      case 'Apr':
      case 'May':
      case 'Jun':
      case 'Jul':
      case 'Aug':
      case 'Sep':
      case 'Oct':
      case 'Nov':
      case 'Dec':
        this.aggregateService.getActiveCharStatsForMonth(this.selectedCorp.corporationid, this.selectedYear + monthNum[this.selectedPeriod])
          .first()
          .subscribe(activeCharData => {
            this.activeCharData = activeCharData;
            this.display = true;
            this.changeDetectorRef.markForCheck();
          });
        break;
      case 'Q1':
      case 'Q2':
      case 'Q3':
      case 'Q4':
        this.aggregateService.getActiveCharStatsForQuarter(this.selectedCorp.corporationid, this.selectedYear + monthNum[this.selectedPeriod])
          .first()
          .subscribe(activeCharData => {
            this.activeCharData = activeCharData;
            this.display = true;
            this.changeDetectorRef.markForCheck();
          });
        break;
      case 'Last90':
        this.aggregateService.getActiveCharStatsForLast90Days(this.selectedCorp.corporationid)
          .first()
          .subscribe(activeCharData => {
            this.activeCharData = activeCharData;
            this.display = true;
            this.changeDetectorRef.markForCheck();
          });
        break;
      default:
        break;
    }
  }
}
