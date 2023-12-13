import { Component, ElementRef, ViewChild } from '@angular/core';
import { createChart } from 'lightweight-charts';

@Component({
  selector: 'app-simple-chart',
  templateUrl: './simple-chart.component.html',
  styleUrls: ['./simple-chart.component.css'],
})
export class SimpleChartComponent {
  data: { time: string; value: string }[];

  @ViewChild('chartRef', { static: true })
  chartRef: ElementRef;

  chart;
  lineSeries;

  name = 'Chart';

  ngOnInit() {
    const chartElement = this.chartRef.nativeElement;
    this.chart = createChart(chartElement, {
      width: 340,
      height: 200,
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
      layout: {
        background: {
          color: 'transparent',
        },
      },
      crosshair: {
        mode: 2,
      },
      handleScroll: {
        mouseWheel: false,
        pressedMouseMove: false,
        horzTouchDrag: false,
        vertTouchDrag: false,
      },
      handleScale: {
        axisPressedMouseMove: false,
        mouseWheel: false,
        pinch: false,
      },
    });

    this.lineSeries = this.chart.addAreaSeries({
      topColor: 'rgba(33, 150, 243, 0.4)',
      bottomColor: 'rgba(33, 150, 243, 0)',
      lineColor: 'rgba(33, 150, 243, 1)',
      lineWidth: 2,
      lineType: 2,
    });
    this.lineSeries.setData([
      { time: '2019-05-24', value: 10 },
      { time: '2019-05-25', value: 12 },
      { time: '2019-05-26', value: 12.4 },
      { time: '2019-05-27', value: 11.2 },
      { time: '2019-05-28', value: 12 },
      { time: '2019-05-29', value: 12.1 },
      { time: '2019-05-30', value: 13.5 },
      { time: '2019-05-31', value: 15 },
      { time: '2019-06-01', value: 14 },
      { time: '2019-06-02', value: 13 },
      { time: '2019-06-03', value: 15 },
      { time: '2019-06-04', value: 18 },
      { time: '2019-06-05', value: 17 },
      { time: '2019-06-06', value: 16 },
    ]);

    this.chart.priceScale('right').applyOptions({
      visible: false,
    });

    this.chart.timeScale('right').applyOptions({
      visible: false,
    });
    this.chart.timeScale().fitContent();

    this.chart.timeScale().applyOptions({ fixLeftEdge: true });
  }
}
