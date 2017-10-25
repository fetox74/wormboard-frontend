import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ZWBAggregateCorp} from '../../../model/zwb-aggregate-corp';
import {SelectItem} from 'primeng/primeng';
import {AggregateService} from '../../../service/aggregate.service';
import {monthNum} from '../../app.component';

@Component({
  selector: 'app-history-dialog',
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./history-dialog.component.scss'],
  providers: [AggregateService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryDialogComponent implements OnInit {
  public display = false;

  public historyData: any;
  public chartData: any;

  public profiles: SelectItem[];
  public selectedProfile: any;

  @Input()
  public selectedCorp: ZWBAggregateCorp;

  @Input()
  public selectedPeriod: string;

  @Input()
  public selectedYear: string;

  constructor(private aggregateService: AggregateService,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.profiles = [];
    this.profiles.push({label: 'Kills / losses + active chars', value: {id: 'kd'}});
    this.profiles.push({label: 'ISK won / lost + net ISK', value: {id: 'isk'}});
  }

  public show() {
    this.selectedProfile = this.profiles[0].value;

    switch (this.selectedPeriod) {
      case 'ALL':
        this.aggregateService.getCorpHistoryForYear(this.selectedCorp.corporationid, this.selectedYear)
          .first()
          .subscribe(historyData => {
            this.historyData = historyData;
            this.chartData = this.generateHistoryChartData(historyData.kills, historyData.losses, historyData.numactive,
              '# kills', '# losses', '# active players', false);
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
        this.aggregateService.getCorpHistoryForMonth(this.selectedCorp.corporationid, this.selectedYear + monthNum[this.selectedPeriod])
          .first()
          .subscribe(historyData => {
            this.historyData = historyData;
            this.chartData = this.generateHistoryChartData(historyData.kills, historyData.losses, historyData.numactive,
              '# kills', '# losses', '# active players', false);
            this.display = true;
            this.changeDetectorRef.markForCheck();
          });
        break;
      case 'Q1':
      case 'Q2':
      case 'Q3':
      case 'Q4':
        this.aggregateService.getCorpHistoryForQuarter(this.selectedCorp.corporationid, this.selectedYear + monthNum[this.selectedPeriod])
          .first()
          .subscribe(historyData => {
            this.historyData = historyData;
            this.chartData = this.generateHistoryChartData(historyData.kills, historyData.losses, historyData.numactive,
              '# kills', '# losses', '# active players', false);
            this.display = true;
            this.changeDetectorRef.markForCheck();
          });
        break;
      case 'Last90':
        this.aggregateService.getCorpHistoryForLast90Days(this.selectedCorp.corporationid)
          .first()
          .subscribe(historyData => {
            this.historyData = historyData;
            this.chartData = this.generateHistoryChartData(historyData.kills, historyData.losses, historyData.numactive,
              '# kills', '# losses', '# active players', false);
            this.display = true;
            this.changeDetectorRef.markForCheck();
          });
        break;
      default:
        break;
    }
  }

  public onHistoryProfileChange(): void {
    if (this.selectedProfile.id === 'kd') {
      this.chartData = this.generateHistoryChartData(this.historyData.kills, this.historyData.losses, this.historyData.numactive,
        '# kills', '# losses', '# active players', false);
    } else if (this.selectedProfile.id === 'isk') {
      this.chartData = this.generateHistoryChartData(this.historyData.iskwon, this.historyData.isklost, this.historyData.netisk,
        'b isk killed', 'b isk lost', 'net isk in b', true);
    } else {
      this.chartData = null;
    }
  }

  private generateHistoryChartData(positive: number[], negative: number[], additional: number[], positivelabel: string, negativelabel: string,
                                   additionallabel: string, additionaldash: boolean): any {
    return {
      labels: ['1. Jan', '15. Jan', '1. Feb', '15. Feb', '1. Mar', '15. Mar', '1. Apr', '15. Apr', '1. May', '15. May', '1. Jun', '15. Jun',
        '1. Jul', '15. Jul', '1. Aug', '15. Aug', '1. Sep', '15. Sep', '1. Oct', '15. Oct', '1. Nov', '15. Nov', '1. Dec', '15. Dec'],
      marginLeft: 60,
      datasets: [
        {
          label: positivelabel,
          backgroundColor: 'rgba(101, 200, 189, 0.5)',
          borderColor: '#53A69B',
          data: positive
        },
        {
          label: negativelabel,
          backgroundColor: 'rgba(177, 16, 0, 0.5)',
          borderColor: '#7A0D00',
          data: negative
        },
        {
          label: additionallabel,
          backgroundColor: additionaldash ? 'rgba(0, 0, 0, 0.0)' : 'rgba(89, 135, 140, 0.5)',
          borderDash: additionaldash ? [15, 5] : [],
          borderColor: additionaldash ? '#315054' : '#4f777b',
          data: additional
        }
      ]
    };
  }
}
