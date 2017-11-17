import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AggregateService} from '../../../service/aggregate.service';
import {ZWBAggregateCorp} from '../../../model/zwb-aggregate-corp';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-impact-dialog',
  templateUrl: './impact-dialog.component.html',
  styleUrls: ['./impact-dialog.component.css']
})
export class ImpactDialogComponent implements OnInit {
  public display = false;

  public data: any;

  public profiles: SelectItem[];

  @Input()
  public selectedCorp: ZWBAggregateCorp;

  constructor(private aggregateService: AggregateService,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.profiles = [];
    this.profiles.push({label: 'ISK destroyed', value: {id: 'isk'}});
    this.profiles.push({label: 'kills', value: {id: 'kills'}});

    this.data = {
      labels: ['Hard Knocks Inc.', 'Lazerhawks', 'Ars Venandi', 'others'],
      datasets: [
        {
          data: [5, 3, 2, 90],
          backgroundColor: [
            '#508c6e',
            '#7b8c73',
            '#4e6b8c',
            '#79aeb3'
          ],
          hoverBackgroundColor: [
            '#71b394',
            '#9cad93',
            '#6487ab',
            '#89c6cb'
          ]
        }]
    };
  }

  public show() {
    this.display = true;
  }
}
