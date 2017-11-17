import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AggregateService} from '../service/aggregate.service';
import {ZWBAggregateCorp} from '../model/zwb-aggregate-corp';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DataTable, MenuItem, SelectItem} from 'primeng/primeng';
import {HistoryDialogComponent} from './dialog/history-dialog/history-dialog.component';
import {ActiveCharsDialogComponent} from './dialog/active-chars-dialog/active-chars-dialog.component';
import {TimezoneDialogComponent} from './dialog/timezone-dialog/timezone-dialog.component';
import {NotificationDialogComponent} from './dialog/notification-dialog/notification-dialog.component';
import {DayOfTheWeekDialogComponent} from './dialog/day-of-the-week-dialog/day-of-the-week-dialog.component';

export const monthNum = {
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AggregateService],
  animations: [
    trigger('menuState', [
      state('invisible', style({
        transform: 'translateY(calc(-100% + 8px))'
      })),
      state('visible', style({
        transform: 'translateY(0)'
      })),
      transition('invisible => visible', animate('100ms ease-in')),
      transition('visible => invisible', animate('100ms ease-out'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  @ViewChild('dataTable')
  public dataTable: DataTable;
  @ViewChild('dataTable')
  public dataTableER: ElementRef;
  public first = 0;

  @ViewChild(TimezoneDialogComponent)
  private timezoneDialog: TimezoneDialogComponent;

  @ViewChild(HistoryDialogComponent)
  private historyDialog: HistoryDialogComponent;

  @ViewChild(ActiveCharsDialogComponent)
  private activeCharsDialog: ActiveCharsDialogComponent;

  @ViewChild(DayOfTheWeekDialogComponent)
  private dayOfTheWeekDialog: DayOfTheWeekDialogComponent;

  @ViewChild(NotificationDialogComponent)
  private notificationDialog: NotificationDialogComponent;

  private contextMenuItems: MenuItem[];
  public selectedCorp: ZWBAggregateCorp;

  public searchedCorp: string;
  public knownCorporations: string[];
  public filteredCorporations: string[];

  public condenseIsk = false;
  public displaySearch = false;
  public compareMode = false;
  public aggregates: ZWBAggregateCorp[];
  public selectedPeriod: string;
  public selectedYear: string;
  public years: string[];
  public month: string[];
  public status = 'loading server status...';
  public menuState = 'invisible';

  constructor(private aggregateService: AggregateService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.contextMenuItems = [
      {
        label: 'Info',
        icon: 'fa-info',
        items: [
          {label: 'Timezone', icon: 'fa-clock-o', command: (event) => this.onShowTimezoneDialog()},
          {label: 'Day of the week', icon: 'fa-calendar', command: (event) => this.onShowDayOfTheWeekDialog()},
          {label: 'Active players', icon: 'fa-user', command: (event) => this.onShowActiveCharsDialog()}
        ]
      },
      {
        label: 'Graphs',
        icon: 'fa-area-chart',
        items: [
          {label: 'History', icon: 'fa-bar-chart', command: (event) => this.onShowHistoryDialog()},
          {label: 'Comparison', icon: 'fa-balance-scale', command: (event) => this.showSearch(true)}
        ]
      },
      {label: 'Search', icon: 'fa-search', command: (event) => this.showSearch(false)}
    ];

    this.aggregateService.getServerStatus()
      .first()
      .subscribe(serverStatus => {
        this.status = serverStatus.statusMessage;
        this.month = serverStatus.allMonth;
        this.years = this.getAllYearsFromMonth(serverStatus.allMonth);
        this.years.push('ALL');

        this.selectedPeriod = 'ALL';
        this.selectedYear = this.years[0];
        this.aggregateService.getStatsForYear(this.selectedYear)
          .first()
          .subscribe(aggregates => {
            this.aggregates = aggregates;
            this.changeDetectorRef.markForCheck();
        });
    });

    this.aggregateService.getAllKnownCorps()
      .first()
      .subscribe(knownCorporations => {
        this.knownCorporations = knownCorporations;
    });
  }

  onSelect(period: string) {
    if (period !== this.selectedPeriod &&
       (period === 'ALL' || period === 'Last90' || this.month.some(e => e === this.selectedYear + monthNum[period]))) {
      this.selectedPeriod = period;
      switch (period) {
        case 'ALL':
          this.aggregateService.getStatsForYear(this.selectedYear)
            .first()
            .subscribe(aggregates => {
              this.aggregates = aggregates;
              this.getServerStatus();
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
          this.aggregateService.getStatsForMonth(this.selectedYear + monthNum[period])
            .first()
            .subscribe(aggregates => {
              this.aggregates = aggregates;
              this.getServerStatus();
          });
          break;
        case 'Q1':
        case 'Q2':
        case 'Q3':
        case 'Q4':
          this.aggregateService.getStatsForQuarter(this.selectedYear + monthNum[period])
            .first()
            .subscribe(aggregates => {
              this.aggregates = aggregates;
              this.getServerStatus();
          });
          break;
        case 'Last90':
          this.aggregateService.getStatsForLast90Days()
            .first()
            .subscribe(aggregates => {
              this.aggregates = aggregates;
              this.getServerStatus();
              this.selectedYear = this.years[0];
          });
          break;
        default:
          break;
      }
    }
  }

  private getServerStatus() {
    this.aggregateService.getServerStatus()
      .first()
      .subscribe(serverStatus => {
        this.status = serverStatus.statusMessage;
        this.month = serverStatus.allMonth;
        this.changeDetectorRef.markForCheck();
      });
  }

  onYearMenu(event: Event): void {
    event.stopPropagation();
    this.menuState = this.menuState === 'visible' ? 'invisible' : 'visible';
  }

  onSelectYear(event: Event, year: string) {
    if (this.selectedYear !== year) {
      this.selectedYear = year;
      this.selectedPeriod = 'ALL';

      if (this.selectedYear === 'ALL') {
        this.aggregateService.getStatsForAllTime()
          .first()
          .subscribe(aggregates => {
            this.aggregates = aggregates;
            this.getServerStatus();
          });
      } else {
        this.aggregateService.getStatsForYear(this.selectedYear)
          .first()
          .subscribe(aggregates => {
            this.aggregates = aggregates;
            this.getServerStatus();
          });
      }
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
      return this.month.some(e => e === this.selectedYear + monthNum[period]);
    } else {
      return false;
    }
  }

  onToggleISKPipe(event: Event): void {
    // this.changeDetectorRef.markForCheck();
  }

  onShowTimezoneDialog() {
    if (this.selectedYear === 'ALL') {
      this.notificationDialog.show('Function not (yet) implemented for period ALL years, please change scope!');
    } else {
      this.timezoneDialog.show();
    }
  }

  onShowActiveCharsDialog() {
    if (this.selectedYear === 'ALL') {
      this.notificationDialog.show('Function not (yet) implemented for period ALL years, please change scope!');
    } else {
      this.activeCharsDialog.show();
    }
  }

  onShowDayOfTheWeekDialog() {
    if (this.selectedYear === 'ALL') {
      this.notificationDialog.show('Function not (yet) implemented for period ALL years, please change scope!');
    } else {
      this.dayOfTheWeekDialog.show();
    }
  }

  onShowHistoryDialog() {
    if (this.selectedPeriod !== 'ALL') {
      this.notificationDialog.show('Graphs not (yet) implemented for shorter periods than ALL, please change scope!');
    } else {
      this.historyDialog.show(null);
    }
  }

  showSearch(forComparison: boolean) {
    if (this.selectedPeriod !== 'ALL') {
      this.notificationDialog.show('Graphs not (yet) implemented for shorter periods than ALL, please change scope!');
    } else {
      this.displaySearch = true;
      this.compareMode = forComparison;
    }
  }

  doSearch() {
    this.displaySearch = false;

    let comparisonCorp: ZWBAggregateCorp = null;
    if (this.compareMode) {
      for (const aggregate of this.aggregates) {
        if (aggregate.corporation === this.searchedCorp) {
          comparisonCorp = aggregate;
        }
      }
      if (!comparisonCorp) {
        this.notificationDialog.show('Corporation to compare not found!');
      } else if (this.selectedCorp === comparisonCorp) {
        this.notificationDialog.show('Can\'t compare to the same corporation!');
      } else {
        this.historyDialog.show(comparisonCorp);
      }
    } else {
      this.aggregates.sort((a, b) => (a[this.dataTable.sortField] - b[this.dataTable.sortField]) * this.dataTable.sortOrder);

      let i = 0;
      for (const aggregate of this.aggregates) {
        if (aggregate.corporation === this.searchedCorp) {
          this.selectedCorp = aggregate;
          this.first = i - i % this.dataTable.rows;
          this.scrollToSelection(this.dataTable, this.dataTableER.nativeElement, i % this.dataTable.rows);
        }
        i++;
      }
    }
  }

  filterCorporations(event) {
    this.filteredCorporations = [];
    for (let i = 0; i < this.knownCorporations.length; i++) {
      const corp = this.knownCorporations[i];
      if (corp.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredCorporations.push(corp);
      }
    }
  }

  scrollToSelection(table: DataTable, element: HTMLElement, index) {
    if (table.selection !== null && table.value !== null) {
      // let index = table.value.indexOf(table.selection);
      const list = document.querySelectorAll('tr');
      if (list !== null && index < list.length) {
        const targetElement = list.item(index);
        targetElement.scrollIntoView();
      }
    }
  }
}
