import {animate, Component, OnInit, state, style, transition, trigger} from '@angular/core';
import {AggregateService} from './aggregate.service';
import {ZKBAggregate} from './model/zkb-aggregate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AggregateService],
  animations: [
    trigger('menuTrigger', [
      state('invisible', style({
        margin: '-35px 0px 0px -10px'
      })),
      state('visible',   style({
        margin: '5px 0px 0px -10px'
      })),
      transition('invisible => visible', animate('100ms ease-in')),
      transition('visible => invisible', animate('100ms ease-out'))
    ])
  ]
})
export class AppComponent implements OnInit {
  public aggregates: ZKBAggregate[];
  public selectedMonth: string;
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
    'Dec': '12'
  };

  constructor(private aggregateService: AggregateService) {
  }

  ngOnInit() {
    this.aggregateService.getServerStatus().first().subscribe(e => {
      this.status = e.statusMessage;
      this.month = e.allMonth;
      this.years = this.getAllYearsFromMonth(e.allMonth);

      this.selectedMonth = 'ALL';
      this.selectedYear = this.years[0];
      this.aggregateService.getStatsForYear(this.selectedYear).first().subscribe(e => {
        this.aggregates = e;
      });
    });
  }

  onSelect(month: string) {
    if (month !== this.selectedMonth && (month === 'ALL' || this.month.some(e => e === this.selectedYear + this.monthNum[month]))) {
      this.selectedMonth = month;
      switch (month) {
        case 'ALL':
          this.aggregateService.getStatsForYear(this.selectedYear).first().subscribe(e => {
            this.aggregates = e;

            this.aggregateService.getServerStatus().first().subscribe(e => {
              this.status = e.statusMessage;
              this.month = e.allMonth;
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
          this.aggregateService.getStatsForMonth(this.selectedYear + this.monthNum[month]).first().subscribe(e => {
            this.aggregates = e;

            this.aggregateService.getServerStatus().first().subscribe(e => {
              this.status = e.statusMessage;
              this.month = e.allMonth;
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
      this.selectedMonth = 'ALL';

      this.aggregateService.getStatsForYear(this.selectedYear).first().subscribe(e => {
        this.aggregates = e;

        this.aggregateService.getServerStatus().first().subscribe(e => {
          this.status = e.statusMessage;
          this.month = e.allMonth;
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

  isMonthAvailable(month): boolean {
    if (this.month) {
      return this.month.some(e => e === this.selectedYear + this.monthNum[month]);
    } else {
      return false;
    }
  }
}
