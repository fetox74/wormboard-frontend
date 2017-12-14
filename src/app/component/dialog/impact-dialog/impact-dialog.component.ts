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
    this.profiles = [];
    this.profiles.push({label: 'ISK destroyed', value: {id: 'iskwon'}});
    this.profiles.push({label: 'Kills', value: {id: 'kills'}});
    this.profiles.push({label: 'Active players', value: {id: 'numactive'}});
    this.selectedProfile = this.profiles[0].value;
  }

  ngOnInit() {
    this.enableIskPipe();
  }

  public show() {
    this.generateChartData(this.selectedProfile.id);
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

  private disableIskPipe(): void {
    this.options = {
      tooltips: {
        enabled: true,
        mode: 'single'
      }
    };
  }

  public onProfileChange(): void {
    this.generateChartData(this.selectedProfile.id);
    if (this.selectedProfile.id === 'iskwon') {
      this.enableIskPipe();
    } else {
      this.disableIskPipe();
    }
  }

  private generateChartData(field: string): void {
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
            '#D7DCDC'
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
            '#D7DCDC'
          ]
        }]
    };

    if (this.aggregates) {
      this.aggregates.sort((a, b) => b[field] - a[field]);

      this.data.labels = this.aggregates.slice(0, 10).map(a => a.corporation);
      this.data.datasets[0].data = this.aggregates.slice(0, 10).map(a => a[field]);

      if (this.data.labels.indexOf(this.selectedCorp.corporation) < 0) {
        this.data.labels.push(this.selectedCorp.corporation);
        this.data.datasets[0].data.push(this.selectedCorp[field]);
        this.data.datasets[0].backgroundColor.push('#9C1113');
        this.data.datasets[0].hoverBackgroundColor.push('#9C1113');
      } else {
        const indexSelectedCorp = this.data.labels.indexOf(this.selectedCorp.corporation);
        this.data.datasets[0].backgroundColor[indexSelectedCorp] = '#9C1113';
        this.data.datasets[0].hoverBackgroundColor[indexSelectedCorp] = '#9C1113';
      }

      this.data.datasets[0].data.push(this.aggregates
        .filter(a => this.data.labels.indexOf(a.corporation) < 0)
        .map(a => a[field])
        .reduce((sum, current) => sum + current));

      this.data.labels.push('others');
      this.changeDetectorRef.markForCheck();
    }
  }
}
