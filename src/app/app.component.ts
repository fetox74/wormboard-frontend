import {Component, OnInit} from '@angular/core';
import {AggregateService} from './aggregate.service';
import {ZKBAggregate} from './model/zkb-aggregate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AggregateService]
})
export class AppComponent implements OnInit {
  public aggregates: ZKBAggregate[];
  public selected: string;

  constructor(private aggregateService: AggregateService) {
  }

  ngOnInit() {
    this.selected = 'ALL';
    this.aggregateService.getStatsForYear('2017').first().subscribe(e => {
      this.aggregates = e;
    });
  }

  onSelect(month: string) {
    if (month !== this.selected) {
      this.selected = month;
      switch (month) {
        case 'ALL':
          this.aggregateService.getStatsForYear('2017').first().subscribe(e => {
            this.aggregates = e;
          });
          break;
        case 'Jan':
          this.aggregateService.getStatsForMonth('201701').first().subscribe(e => {
            this.aggregates = e;
          });
          break;
        case 'Feb':
          this.aggregateService.getStatsForMonth('201702').first().subscribe(e => {
            this.aggregates = e;
          });
          break;
        case 'Mar':
          this.aggregateService.getStatsForMonth('201703').first().subscribe(e => {
            this.aggregates = e;
          });
          break;
        case 'Apr':
          this.aggregateService.getStatsForMonth('201704').first().subscribe(e => {
            this.aggregates = e;
          });
          break;
        case 'May':
          this.aggregateService.getStatsForMonth('201705').first().subscribe(e => {
            this.aggregates = e;
          });
          break;
        case 'Jun':
          this.aggregateService.getStatsForMonth('201706').first().subscribe(e => {
            this.aggregates = e;
          });
          break;
        case 'Jul':
          this.aggregateService.getStatsForMonth('201707').first().subscribe(e => {
            this.aggregates = e;
          });
          break;
        case 'Aug':
          this.aggregateService.getStatsForMonth('201708').first().subscribe(e => {
            this.aggregates = e;
          });
          break;
        case 'Sep':
          this.aggregateService.getStatsForMonth('201709').first().subscribe(e => {
            this.aggregates = e;
          });
          break;
        case 'Oct':
          this.aggregateService.getStatsForMonth('201710').first().subscribe(e => {
            this.aggregates = e;
          });
          break;
        case 'Nov':
          this.aggregateService.getStatsForMonth('201711').first().subscribe(e => {
            this.aggregates = e;
          });
          break;
        case 'Dec':
          this.aggregateService.getStatsForMonth('201712').first().subscribe(e => {
            this.aggregates = e;
          });
          break;
        default:
          break;
      }
    }
  }
}
