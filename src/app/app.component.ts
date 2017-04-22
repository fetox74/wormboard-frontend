import {Component, OnInit} from '@angular/core';
import {ZKBAggregateList} from './model/zkb-aggregate-list';
import {AggregateService} from './aggregate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AggregateService]
})
export class AppComponent implements OnInit {
  public zkbAggregateList: ZKBAggregateList;

  constructor(private aggregateService: AggregateService) {
  }

  ngOnInit() {
    this.aggregateService.getStatsForMonth('201701').first().subscribe(e => {
      this.zkbAggregateList = e;
    });
  }
}
