import { Component, Input } from '@angular/core';
import { NgxChartsModule, LegendPosition } from '@swimlane/ngx-charts';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, NgxSkeletonLoaderModule],
  templateUrl: './chart.html',
  styleUrl: './chart.css',
})
export class Chart {
  @Input() latest20: { name: number; value: number }[] = [];
  @Input() isLoading = false;

  legend = true;
  legendTitle = 'Legend';
  legendPosition: LegendPosition = LegendPosition.Below;
  showGridLines = true;

  xAxisLabel = 'Index';
  yAxisLabel = 'Value';
}
