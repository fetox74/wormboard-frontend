import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ZWBAggregateCorp} from '../../../model/zwb-aggregate-corp';
import {monthNum} from '../../app.component';
import {AggregateService} from '../../../service/aggregate.service';

@Component({
  selector: 'app-timezone-dialog',
  templateUrl: './timezone-dialog.component.html',
  styleUrls: ['./timezone-dialog.component.scss'],
  providers: [AggregateService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimezoneDialogComponent implements OnInit {
  public display = false;

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
    switch (this.selectedPeriod) {
      case 'ALL':
        this.aggregateService.getHourlyCorpStatsForYear(this.selectedCorp.corporationid, this.selectedYear)
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
        this.aggregateService.getHourlyCorpStatsForMonth(this.selectedCorp.corporationid, this.selectedYear + monthNum[this.selectedPeriod])
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
        this.aggregateService.getHourlyCorpStatsForQuarter(this.selectedCorp.corporationid, this.selectedYear + monthNum[this.selectedPeriod])
          .first()
          .subscribe(aggregate => {
            this.chartData = this.generateChartData(aggregate.avgkillsperdayactive, aggregate.avgonkills);
            this.display = true;
            this.changeDetectorRef.markForCheck();
          });
        break;
      case 'Last90':
        this.aggregateService.getHourlyCorpStatsForLast90Days(this.selectedCorp.corporationid)
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

  generateChartData(kills: number[], aggressors: number[]): any {
    return {
      labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      marginLeft: 60,
      datasets: [
        {
          label: '# kills',
          backgroundColor: '#65C8BD',
          borderColor: '#53A69B',
          data: kills
        },
        {
          label: 'ø aggressors',
          backgroundColor: '#59878C',
          borderColor: '#4f777b',
          data: aggressors
        }
      ]
    };
  }
}
