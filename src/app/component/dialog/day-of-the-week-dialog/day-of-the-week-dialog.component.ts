import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AggregateService} from '../../../service/aggregate.service';
import {ZWBAggregateCorp} from '../../../model/zwb-aggregate-corp';
import {monthNum} from '../../app.component';

@Component({
  selector: 'app-day-of-the-week-dialog',
  templateUrl: './day-of-the-week-dialog.component.html',
  styleUrls: ['./day-of-the-week-dialog.component.css']
})
export class DayOfTheWeekDialogComponent implements OnInit {
  public display = false;

  public usTZcorrection = false;

  public chartData: any;

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
    if (this.selectedYear === 'ALL') {
      this.aggregateService.getWeekdayCorpStatsForAllTime(this.selectedCorp.corporationid)
        .first()
        .subscribe(aggregate => {
          this.chartData = this.generateChartData(aggregate.avgkillsperdayactive, aggregate.avgonkills);
          this.display = true;
          this.changeDetectorRef.markForCheck();
        });
    } else {
      switch (this.selectedPeriod) {
        case 'ALL':
          this.aggregateService.getWeekdayCorpStatsForYear(this.selectedCorp.corporationid, this.selectedYear)
            .first()
            .subscribe(aggregate => {
              this.chartData = this.generateChartData(aggregate.avgkillsperdayactive, aggregate.avgonkills);
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
          this.aggregateService.getWeekdayCorpStatsForMonth(this.selectedCorp.corporationid, this.selectedYear + monthNum[this.selectedPeriod])
            .first()
            .subscribe(aggregate => {
              this.chartData = this.generateChartData(aggregate.avgkillsperdayactive, aggregate.avgonkills);
              this.display = true;
              this.changeDetectorRef.markForCheck();
            });
          break;
        case 'Q1':
        case 'Q2':
        case 'Q3':
        case 'Q4':
          this.aggregateService.getWeekdayCorpStatsForQuarter(this.selectedCorp.corporationid, this.selectedYear + monthNum[this.selectedPeriod])
            .first()
            .subscribe(aggregate => {
              this.chartData = this.generateChartData(aggregate.avgkillsperdayactive, aggregate.avgonkills);
              this.display = true;
              this.changeDetectorRef.markForCheck();
            });
          break;
        case 'Last90':
          this.aggregateService.getWeekdayCorpStatsForLast90Days(this.selectedCorp.corporationid)
            .first()
            .subscribe(aggregate => {
              this.chartData = this.generateChartData(aggregate.avgkillsperdayactive, aggregate.avgonkills);
              this.display = true;
              this.changeDetectorRef.markForCheck();
            });
          break;
        default:
          break;
      }
    }
  }

  generateChartData(kills: number[], aggressors: number[]): any {
    return {
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
          data: kills
        },
        {
          label: 'ø / kill',
          backgroundColor: 'rgba(89, 135, 140, 0.5)',
          borderColor: '#4f777b',
          pointBackgroundColor: 'rgba(89, 135, 140, 0.5)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#4f777b',
          data: aggressors
        }
      ]
    };
  }
}
