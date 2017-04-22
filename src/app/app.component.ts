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
  aggregates: ZKBAggregate[];

  constructor(private aggregateService: AggregateService) {
  }

  ngOnInit() {
    this.aggregateService.getStatsForMonth('201701').first().subscribe(e => {
      this.aggregates = e;
    });
  }
}
