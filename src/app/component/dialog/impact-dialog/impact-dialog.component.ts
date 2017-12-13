import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ZWBAggregateCorp} from '../../../model/zwb-aggregate-corp';
import {SelectItem} from 'primeng/primeng';
import {IskPipe} from '../../../pipe/isk.pipe';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-impact-dialog',
  templateUrl: './impact-dialog.component.html',
  styleUrls: ['./impact-dialog.component.scss'],
  providers: [IskPipe, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImpactDialogComponent implements OnInit {
  public display = false;

  public data: any;

  public profiles: SelectItem[];
  public selectedProfile: any;

  @Input()
  public aggregates: ZWBAggregateCorp[];

  @Input()
  public selectedCorp: ZWBAggregateCorp;

  public options: any;

  constructor(private iskPipe: IskPipe,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.profiles = [];
    this.profiles.push({label: 'ISK destroyed', value: {id: 'isk'}});
    this.profiles.push({label: 'Kills', value: {id: 'kills'}});
    this.profiles.push({label: 'Active players', value: {id: 'active'}});

    this.enableIskPipe();

    this.generateChartData();
  }

  public show() {
    this.generateChartData();
    this.display = true;
  }

  private enableIskPipe(): void {
    this.options = {
      tooltips: {
        enabled: true,
        mode: 'single',
        callbacks: {
          label: function (tooltipItems, data) {
            const decimalPipe = new DecimalPipe('en-US');
            const iskPipe = new IskPipe();
            return data.labels[tooltipItems.index] + ': '
              + iskPipe.transform(decimalPipe.transform(data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index], '1.2-2'), true);
          }
        }
      }
    };
  }

  public onProfileChange(): void {
    if (this.selectedProfile.id === 'isk') {
      this.generateChartData();
    } else if (this.selectedProfile.id === 'kills') {
      this.generateChartData();
    } else if (this.selectedProfile.id === 'active') {
      this.generateChartData();
    }
  }

  private generateChartData(): void {
    this.data = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [
            '#59878C',
            '#679095',
            '#759A9E',
            '#83A3A7',
            '#91ADB0',
            '#9FB6B9',
            '#ADBFC1',
            '#BBC9CA',
            '#C9D2D3',
            '#D7DCDC',
            '#9C1113'
          ],
          hoverBackgroundColor: [
            '#59878C',
            '#679095',
            '#759A9E',
            '#83A3A7',
            '#91ADB0',
            '#9FB6B9',
            '#ADBFC1',
            '#BBC9CA',
            '#C9D2D3',
            '#D7DCDC',
            '#9C1113'
          ]
        }]
    };

    if (this.aggregates) {
      this.aggregates.sort((a, b) => b.iskwon - a.iskwon);

      this.data.labels = this.aggregates.slice(0, 10).map(a => a.corporation);
      this.data.datasets[0].data = this.aggregates.slice(0, 10).map(a => a.iskwon);

      if (!this.data.labels.includes(this.selectedCorp.corporation)) {
        this.data.labels.push(this.selectedCorp.corporation);
        this.data.datasets[0].data.push(this.selectedCorp.iskwon);
      }

      this.data.datasets[0].data.push(this.aggregates
        .filter(a => !this.data.labels.includes(a.corporation))
        .map(a => a.iskwon)
        .reduce((sum, current) => sum + current));

      this.data.labels.push('others');
      this.changeDetectorRef.markForCheck();
    }
  }
}
