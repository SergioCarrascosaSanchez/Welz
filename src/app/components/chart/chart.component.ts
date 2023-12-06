import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { createChart } from 'lightweight-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  @ViewChild('chartRef', { static: true })
  chartRef: ElementRef;

  chart;

  name = 'Chart';

  public innerWidth: any;

  constructor() {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = this.resize();
    this.chart.applyOptions({ width: this.innerWidth });
    this.chart.timeScale().fitContent();
  }

  ngOnInit() {
    this.innerWidth = this.resize();
    const chartElement = this.chartRef.nativeElement;
    this.chart = createChart(chartElement, {
      width: this.resize(),
      height: 100,
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

    const lineSeries = this.chart.addAreaSeries({
      topColor: 'rgba(33, 150, 243, 0.4)',
      bottomColor: 'rgba(33, 150, 243, 0)',
      lineColor: 'rgba(33, 150, 243, 1)',
      lineWidth: 2,
    });
    lineSeries.setData([
      { time: '2019-04-18', value: 42.43 },
      { time: '2019-04-22', value: 42.0 },
      { time: '2019-04-23', value: 41.99 },
      { time: '2019-04-24', value: 41.85 },
      { time: '2019-04-25', value: 42.93 },
      { time: '2019-04-26', value: 43.08 },
      { time: '2019-04-29', value: 43.45 },
      { time: '2019-04-30', value: 43.53 },
      { time: '2019-05-01', value: 43.42 },
      { time: '2019-05-02', value: 42.65 },
      { time: '2019-05-03', value: 43.29 },
      { time: '2019-05-06', value: 43.3 },
      { time: '2019-05-07', value: 42.76 },
      { time: '2019-05-08', value: 42.55 },
      { time: '2019-05-09', value: 42.92 },
      { time: '2019-05-10', value: 43.15 },
      { time: '2019-05-13', value: 42.28 },
      { time: '2019-05-14', value: 42.91 },
      { time: '2019-05-15', value: 42.49 },
      { time: '2019-05-16', value: 43.19 },
      { time: '2019-05-17', value: 43.54 },
      { time: '2019-05-20', value: 42.78 },
      { time: '2019-05-21', value: 43.29 },
      { time: '2019-05-22', value: 43.3 },
      { time: '2019-05-23', value: 42.73 },
      { time: '2019-05-24', value: 42.67 },
      { time: '2019-05-28', value: 42.75 },
    ]);

    this.chart.priceScale('right').applyOptions({
      visible: false,
    });

    this.chart.timeScale('right').applyOptions({
      visible: false,
    });

    this.chart.timeScale().fitContent();
  }

  resize() {
    const windowSize = window.innerWidth;
    if (windowSize <= 767) {
      return (window.innerWidth * 85) / 100;
    }
    if (windowSize > 767 && windowSize < 1279) {
      return (window.innerWidth * 65) / 100;
    }
    if (windowSize > 1279 && windowSize < 1439) {
      return (window.innerWidth * 47) / 100;
    }
    return (window.innerWidth * 37) / 100;
  }
}
