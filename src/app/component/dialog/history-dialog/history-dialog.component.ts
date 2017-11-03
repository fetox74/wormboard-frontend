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
  public singleChartMode = false;

  public historyData: any;
  public chartData: any;

  public historyDataComparison: any;
  public chartDataComparison: any;
  public chartDataCombined: any;
  public options: any;

  public profiles: SelectItem[];
  public selectedProfile: any;

  @Input()
  public selectedCorp: ZWBAggregateCorp;
  public comparisonCorp: ZWBAggregateCorp = null;

  @Input()
  public selectedPeriod: string;

  @Input()
  public selectedYear: string;

  constructor(private aggregateService: AggregateService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.profiles = [];
    this.profiles.push({label: 'Kills / losses + active chars', value: {id: 'kd'}});
    this.profiles.push({label: 'ISK won / lost + net ISK', value: {id: 'isk'}});

    this.options = {
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: false
          }
        }]
      }
    };
  }

  public show(comparisonCorp: ZWBAggregateCorp) {
    this.comparisonCorp = comparisonCorp;
    this.selectedProfile = this.profiles[0].value;

    if (this.selectedYear === 'ALL') {
      this.aggregateService.getCorpHistoryForAllTime(this.selectedCorp.corporationid)
        .first()
        .subscribe(historyData => {
          this.historyData = historyData;
          this.chartData = this.generateHistoryChartData(historyData.kills, historyData.losses, historyData.numactive,
            '# kills', '# losses', '# active players', false);
          if (this.comparisonCorp != null) {
            this.aggregateService.getCorpHistoryForAllTime(this.comparisonCorp.corporationid)
              .first()
              .subscribe(historyDataComparison => {
                this.historyDataComparison = historyDataComparison;
                this.chartDataComparison = this.generateHistoryChartData(historyDataComparison.kills, historyDataComparison.losses,
                  historyDataComparison.numactive, '# kills', '# losses', '# active players', false);
                this.chartDataCombined = this.generateHistoryChartDataCombined(this.historyData.kills, this.historyData.losses, this.historyData.numactive,
                  historyDataComparison.kills, historyDataComparison.losses, historyDataComparison.numactive, '# kills', '# losses',
                  '# active players', false);
                this.display = true;
                this.changeDetectorRef.markForCheck();
              });
          }
          this.display = true;
          this.changeDetectorRef.markForCheck();
        });
    } else {
      switch (this.selectedPeriod) {
        case 'ALL':
          this.aggregateService.getCorpHistoryForYear(this.selectedCorp.corporationid, this.selectedYear)
            .first()
            .subscribe(historyData => {
              this.historyData = historyData;
              this.chartData = this.generateHistoryChartData(historyData.kills, historyData.losses, historyData.numactive,
                '# kills', '# losses', '# active players', false);
              if (this.comparisonCorp != null) {
                this.aggregateService.getCorpHistoryForYear(this.comparisonCorp.corporationid, this.selectedYear)
                  .first()
                  .subscribe(historyDataComparison => {
                    this.historyDataComparison = historyDataComparison;
                    this.chartDataComparison = this.generateHistoryChartData(historyDataComparison.kills, historyDataComparison.losses,
                      historyDataComparison.numactive, '# kills', '# losses', '# active players', false);
                    this.chartDataCombined = this.generateHistoryChartDataCombined(this.historyData.kills, this.historyData.losses, this.historyData.numactive,
                      historyDataComparison.kills, historyDataComparison.losses, historyDataComparison.numactive, '# kills', '# losses',
                      '# active players', false);
                    this.display = true;
                    this.changeDetectorRef.markForCheck();
                  });
              }
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
              this.chartDataCombined = this.generateHistoryChartDataCombined(this.historyData.kills, this.historyData.losses, this.historyData.numactive,
                historyData.kills, historyData.losses, historyData.numactive, '# kills', '# losses', '# active players',
                false);
              if (this.comparisonCorp != null) {
                this.aggregateService.getCorpHistoryForMonth(this.comparisonCorp.corporationid, this.selectedYear + monthNum[this.selectedPeriod])
                  .first()
                  .subscribe(historyDataComparison => {
                    this.historyDataComparison = historyDataComparison;
                    this.chartDataComparison = this.generateHistoryChartData(historyDataComparison.kills, historyDataComparison.losses,
                      historyDataComparison.numactive, '# kills', '# losses', '# active players', false);
                    this.chartDataCombined = this.generateHistoryChartDataCombined(this.historyData.kills, this.historyData.losses, this.historyData.numactive,
                      historyDataComparison.kills, historyDataComparison.losses, historyDataComparison.numactive, '# kills', '# losses',
                      '# active players', false);
                    this.display = true;
                    this.changeDetectorRef.markForCheck();
                  });
              }
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
              if (this.comparisonCorp != null) {
                this.aggregateService.getCorpHistoryForQuarter(this.comparisonCorp.corporationid, this.selectedYear + monthNum[this.selectedPeriod])
                  .first()
                  .subscribe(historyDataComparison => {
                    this.historyDataComparison = historyDataComparison;
                    this.chartDataComparison = this.generateHistoryChartData(historyDataComparison.kills, historyDataComparison.losses,
                      historyDataComparison.numactive, '# kills', '# losses', '# active players', false);
                    this.chartDataCombined = this.generateHistoryChartDataCombined(this.historyData.kills, this.historyData.losses, this.historyData.numactive,
                      historyDataComparison.kills, historyDataComparison.losses, historyDataComparison.numactive, '# kills', '# losses',
                      '# active players', false);
                    this.display = true;
                    this.changeDetectorRef.markForCheck();
                  });
              }
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
              if (this.comparisonCorp != null) {
                this.aggregateService.getCorpHistoryForLast90Days(this.comparisonCorp.corporationid)
                  .first()
                  .subscribe(historyDataComparison => {
                    this.historyDataComparison = historyDataComparison;
                    this.chartDataComparison = this.generateHistoryChartData(historyDataComparison.kills, historyDataComparison.losses,
                      historyDataComparison.numactive, '# kills', '# losses', '# active players', false);
                    this.chartDataCombined = this.generateHistoryChartDataCombined(this.historyData.kills, this.historyData.losses, this.historyData.numactive,
                      historyDataComparison.kills, historyDataComparison.losses, historyDataComparison.numactive, '# kills', '# losses',
                      '# active players', false);
                    this.display = true;
                    this.changeDetectorRef.markForCheck();
                  });
              }
              this.display = true;
              this.changeDetectorRef.markForCheck();
            });
          break;
        default:
          break;
      }
    }
  }

  public onHistoryProfileChange(): void {
    if (this.selectedProfile.id === 'kd') {
      this.chartData = this.generateHistoryChartData(this.historyData.kills, this.historyData.losses, this.historyData.numactive,
        '# kills', '# losses', '# active players', false);
      if (this.comparisonCorp != null) {
        this.chartDataComparison = this.generateHistoryChartData(this.historyDataComparison.kills, this.historyDataComparison.losses,
          this.historyDataComparison.numactive, '# kills', '# losses', '# active players', false);
        this.chartDataCombined = this.generateHistoryChartDataCombined(this.historyData.kills, this.historyData.losses, this.historyData.numactive,
          this.historyDataComparison.kills, this.historyDataComparison.losses, this.historyDataComparison.numactive,
          '# kills', '# losses', '# active players', false);
      }
    } else if (this.selectedProfile.id === 'isk') {
      this.chartData = this.generateHistoryChartData(this.historyData.iskwon, this.historyData.isklost, this.historyData.netisk,
        'b isk killed', 'b isk lost', 'net isk in b', true);
      if (this.comparisonCorp != null) {
        this.chartDataComparison = this.generateHistoryChartData(this.historyDataComparison.iskwon, this.historyDataComparison.isklost,
          this.historyDataComparison.netisk, 'b isk killed', 'b isk lost', 'net isk in b', true);
        this.chartDataCombined = this.generateHistoryChartDataCombined(this.historyData.iskwon, this.historyData.isklost, this.historyData.netisk,
          this.historyDataComparison.iskwon, this.historyDataComparison.isklost, this.historyDataComparison.netisk,
          'b isk killed', 'b isk lost', 'net isk in b', true);
      }
    } else {
      this.chartData = null;
    }
  }

  private generateHistoryChartData(positive: number[], negative: number[], additional: number[], positivelabel: string, negativelabel: string,
                                   additionallabel: string, additionaldash: boolean): any {
    return {
      labels: this.selectedYear === 'ALL' ?
        ['Jan 2015', 'Feb 2015', 'Mar 2015', 'Apr 2015', 'May 2015', 'Jun 2015', 'Jul 2015', 'Aug 2015', 'Sep 2015', 'Oct 2015', 'Nov 2015', 'Dec 2015',
          'Jan 2016', 'Feb 2016', 'Mar 2016', 'Apr 2016', 'May 2016', 'Jun 2016', 'Jul 2016', 'Aug 2016', 'Sep 2016', 'Oct 2016', 'Nov 2016', 'Dec 2016',
          'Jan 2017', 'Feb 2017', 'Mar 2017', 'Apr 2017', 'May 2017', 'Jun 2017', 'Jul 2017', 'Aug 2017', 'Sep 2017', 'Oct 2017', 'Nov 2017', 'Dec 2017'] :
        ['1. Jan', '15. Jan', '1. Feb', '15. Feb', '1. Mar', '15. Mar', '1. Apr', '15. Apr', '1. May', '15. May', '1. Jun', '15. Jun', '1. Jul', '15. Jul',
          '1. Aug', '15. Aug', '1. Sep', '15. Sep', '1. Oct', '15. Oct', '1. Nov', '15. Nov', '1. Dec', '15. Dec'],
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

  private generateHistoryChartDataCombined(positiveA: number[], negativeA: number[], additionalA: number[], positiveB: number[], negativeB: number[],
                                           additionalB: number[], positivelabel: string, negativelabel: string, additionallabel: string,
                                           additionaldash: boolean): any {
    return {
      labels: this.selectedYear === 'ALL' ?
        ['Jan 2015', 'Feb 2015', 'Mar 2015', 'Apr 2015', 'May 2015', 'Jun 2015', 'Jul 2015', 'Aug 2015', 'Sep 2015', 'Oct 2015', 'Nov 2015', 'Dec 2015',
          'Jan 2016', 'Feb 2016', 'Mar 2016', 'Apr 2016', 'May 2016', 'Jun 2016', 'Jul 2016', 'Aug 2016', 'Sep 2016', 'Oct 2016', 'Nov 2016', 'Dec 2016',
          'Jan 2017', 'Feb 2017', 'Mar 2017', 'Apr 2017', 'May 2017', 'Jun 2017', 'Jul 2017', 'Aug 2017', 'Sep 2017', 'Oct 2017', 'Nov 2017', 'Dec 2017'] :
        ['1. Jan', '15. Jan', '1. Feb', '15. Feb', '1. Mar', '15. Mar', '1. Apr', '15. Apr', '1. May', '15. May', '1. Jun', '15. Jun', '1. Jul', '15. Jul',
          '1. Aug', '15. Aug', '1. Sep', '15. Sep', '1. Oct', '15. Oct', '1. Nov', '15. Nov', '1. Dec', '15. Dec'],
      marginLeft: 60,
      datasets: [
        {
          label: positivelabel,
          backgroundColor: 'rgba(101, 200, 189, 0.55)',
          borderColor: '#53A69B',
          data: positiveA
        },
        {
          label: negativelabel,
          backgroundColor: 'rgba(177, 16, 0, 0.45)',
          borderColor: '#7A0D00',
          data: negativeA
        },
        {
          label: additionallabel,
          backgroundColor: additionaldash ? 'rgba(0, 0, 0, 0.0)' : 'rgba(89, 135, 140, 0.55)',
          borderDash: additionaldash ? [15, 5] : [],
          borderColor: additionaldash ? 'rgba(49, 80, 84, 0.55)' : 'rgba(79, 119, 123, 0.55)',
          data: additionalA
        },
        {
          label: '',
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
          borderColor: 'rgba(0, 0, 0, 0.0)',
          data: []
        },
        {
          label: '',
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
          borderColor: 'rgba(0, 0, 0, 0.0)',
          data: []
        },
        {
          label: '',
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
          borderColor: 'rgba(0, 0, 0, 0.0)',
          data: []
        },
        {
          label: positivelabel,
          backgroundColor: 'rgba(101, 200, 189, 0.35)',
          borderColor: 'rgba(101, 200, 189, 0.75)',
          data: positiveB
        },
        {
          label: negativelabel,
          backgroundColor: 'rgba(177, 16, 0, 0.35)',
          borderColor: 'rgba(177, 16, 0, 0.75)',
          data: negativeB
        },
        {
          label: additionallabel,
          backgroundColor: additionaldash ? 'rgba(0, 0, 0, 0.0)' : 'rgba(89, 135, 140, 0.35)',
          borderDash: additionaldash ? [15, 5] : [],
          borderColor: additionaldash ? 'rgba(49, 80, 84, 0.35)' : 'rgba(79, 119, 123, 0.35)',
          data: additionalB
        }
      ]
    };
  }
}
