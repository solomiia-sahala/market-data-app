import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { HistoricalChartService } from '../../services/historical-chart.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-historical-chart',
  templateUrl: './historical-chart.component.html',
  styleUrls: ['./historical-chart.component.css']
})

export class HistoricalChartComponent implements OnInit, OnChanges {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() instrumentId!: string;
  @Input() provider!: string;

  chart!: Chart;
  labels: string[] = [];
  prices: number[] = [];

  constructor(private historicalChartService: HistoricalChartService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['instrumentId'] && !changes['instrumentId'].firstChange) {
      this.fetchData();
    }
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    if (!this.instrumentId || !this.provider) return;

    this.historicalChartService
      .getHistoricalBars(this.instrumentId, this.provider)
      .subscribe((response) => {
        const data = response.data;
        this.labels = data.map((bar: any) => new Date(bar.t).toLocaleDateString());
        this.prices = data.map((bar: any) => bar.c);

        this.renderChart()
      });
  }

  renderChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Closing Price',
            data: this.prices,
            borderColor: 'blue',
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {title: {display: true, text: 'Date'}},
          y: {title: {display: true, text: 'Price'}},
        },
      },
    });
  }
}
