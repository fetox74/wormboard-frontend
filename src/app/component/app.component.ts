import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AggregateService} from '../service/aggregate.service';
import {ZWBAggregateCorp} from '../model/zwb-aggregate-corp';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MenuItem} from 'primeng/primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AggregateService],
  animations: [
    trigger('menuState', [
      state('invisible', style({
        margin: '-35px 0px 0px -10px'
      })),
      state('visible',   style({
        margin: '5px 0px 0px -10px'
      })),
      transition('invisible => visible', animate('100ms ease-in')),
      transition('visible => invisible', animate('100ms ease-out'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private contextMenuItems: MenuItem[];
  public selectedCorp: ZWBAggregateCorp;
  public chartData: any;

  public condenseIsk = false;
  public displayAbout = false;
  public displayLegal = false;
  public displayTimezone = false;
  public aggregates: ZWBAggregateCorp[];
  public selectedPeriod: string;
  public selectedYear: string;
  public years: string[];
  public month: string[];
  public status = 'loading server status...';
  public menuState = 'invisible';
  private monthNum = {
    'Jan': '01',
    'Feb': '02',
    'Mar': '03',
    'Apr': '04',
    'May': '05',
    'Jun': '06',
    'Jul': '07',
    'Aug': '08',
    'Sep': '09',
    'Oct': '10',
    'Nov': '11',
    'Dec': '12',
    'Q1': '01',
    'Q2': '04',
    'Q3': '07',
    'Q4': '10'
  };

  constructor(private aggregateService: AggregateService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.contextMenuItems = [
      {
        label: 'Info',
        icon: 'fa-info',
        items: [
          {label: 'Timezone', icon: 'fa-clock-o', command: (event) => this.showTimezone(this.selectedCorp)},
          {label: 'Active players', icon: 'fa-user'}
        ]
      },
      {
        label: 'Graphs',
        icon: 'fa-area-chart',
        items: [
          {label: 'Histogram', icon: 'fa-bar-chart'},
          {label: 'Comparison', icon: 'fa-balance-scale'}
        ]
      },
      {label: 'Search', icon: 'fa-search'}
    ];

    this.aggregateService.getServerStatus().first().subscribe(e => {
      this.status = e.statusMessage;
      this.month = e.allMonth;
      this.years = this.getAllYearsFromMonth(e.allMonth);

      this.selectedPeriod = 'ALL';
      this.selectedYear = this.years[0];
      this.aggregateService.getStatsForYear(this.selectedYear).first().subscribe(e => {
        this.aggregates = e;
        this.changeDetectorRef.markForCheck();
      });
    });
  }

  onSelect(period: string) {
    if (period !== this.selectedPeriod &&
       (period === 'ALL' || period === 'Last90' || this.month.some(e => e === this.selectedYear + this.monthNum[period]))) {
      this.selectedPeriod = period;
      switch (period) {
        case 'ALL':
          this.aggregateService.getStatsForYear(this.selectedYear).first().subscribe(e => {
            this.aggregates = e;

            this.aggregateService.getServerStatus().first().subscribe(e => {
              this.status = e.statusMessage;
              this.month = e.allMonth;
              this.changeDetectorRef.markForCheck();
            });
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
          this.aggregateService.getStatsForMonth(this.selectedYear + this.monthNum[period]).first().subscribe(e => {
            this.aggregates = e;

            this.aggregateService.getServerStatus().first().subscribe(e => {
              this.status = e.statusMessage;
              this.month = e.allMonth;
              this.changeDetectorRef.markForCheck();
            });
          });
          break;
        case 'Q1':
        case 'Q2':
        case 'Q3':
        case 'Q4':
          this.aggregateService.getStatsForQuarter(this.selectedYear + this.monthNum[period]).first().subscribe(e => {
            this.aggregates = e;

            this.aggregateService.getServerStatus().first().subscribe(e => {
              this.status = e.statusMessage;
              this.month = e.allMonth;
              this.changeDetectorRef.markForCheck();
            });
          });
          break;
        case 'Last90':
          this.aggregateService.getStatsForLast90Days().first().subscribe(e => {
            this.aggregates = e;

            this.aggregateService.getServerStatus().first().subscribe(e => {
              this.status = e.statusMessage;
              this.month = e.allMonth;
              this.changeDetectorRef.markForCheck();
            });
          });
          break;
        default:
          break;
      }
    }
  }

  onYearMenu(event: Event): void {
    event.stopPropagation();
    this.menuState = this.menuState === 'visible' ? 'invisible' : 'visible';
  }

  onSelectYear(event: Event, year: string) {
    if (this.selectedYear !== year) {
      this.selectedYear = year;
      this.selectedPeriod = 'ALL';

      this.aggregateService.getStatsForYear(this.selectedYear).first().subscribe(e => {
        this.aggregates = e;

        this.aggregateService.getServerStatus().first().subscribe(e => {
          this.status = e.statusMessage;
          this.month = e.allMonth;
          this.changeDetectorRef.markForCheck();
        });
      });
    }

    event.stopPropagation();
    this.menuState = 'invisible';
  }

  getAllYearsFromMonth(allMonth: string[]): string[] {
    const allYears = new Set<string>();

    for (const month of allMonth) {
      allYears.add(month.substr(0, 4));
    }

    return Array.from(allYears).sort().reverse();
  }

  isDataAvailable(period): boolean {
    if (this.month) {
      return this.month.some(e => e === this.selectedYear + this.monthNum[period]);
    } else {
      return false;
    }
  }

  onToggleISKPipe(event: Event): void {
    // this.changeDetectorRef.markForCheck();
  }

  showTimezone(zkbAggregate: ZWBAggregateCorp) {
    switch (this.selectedPeriod) {
      case 'ALL':
        this.aggregateService.getHourlyCorpStatsForYear(zkbAggregate.corporation, this.selectedYear).first().subscribe(e => {
          this.chartData = this.generateTimezoneChartData(e.avgkillsperdayactive, e.avgonkills);;
          this.displayTimezone = true;
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
        this.aggregateService.getHourlyCorpStatsForMonth(zkbAggregate.corporation, this.selectedYear + this.monthNum[this.selectedPeriod]).first().subscribe(e => {
          this.chartData = this.generateTimezoneChartData(e.avgkillsperdayactive, e.avgonkills);;
          this.displayTimezone = true;
          this.changeDetectorRef.markForCheck();
        });
        break;
      case 'Q1':
      case 'Q2':
      case 'Q3':
      case 'Q4':
        this.aggregateService.getHourlyCorpStatsForQuarter(zkbAggregate.corporation, this.selectedYear + this.monthNum[this.selectedPeriod]).first().subscribe(e => {
          this.chartData = this.generateTimezoneChartData(e.avgkillsperdayactive, e.avgonkills);;
          this.displayTimezone = true;
          this.changeDetectorRef.markForCheck();
        });
        break;
      case 'Last90':
        this.aggregateService.getHourlyCorpStatsForLast90Days(zkbAggregate.corporation).first().subscribe(e => {
          this.chartData = this.generateTimezoneChartData(e.avgkillsperdayactive, e.avgonkills);
          this.displayTimezone = true;
          this.changeDetectorRef.markForCheck();
        });
        break;
      default:
        break;
    }
  }

  generateTimezoneChartData(kills: number[], aggressors: number[]): any {
    return {
      labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      datasets: [
        {
          label: '# kills (click to disable)',
          backgroundColor: '#65C8BD',
          borderColor: '#53A69B',
          data: kills
        },
        {
          label: 'ø Aggressors (click to disable)',
          backgroundColor: '#59878C',
          borderColor: '#4f777b',
          data: aggressors
        }
      ]
    };
  }
}
