import {
  Component,
  ElementRef,
  HostListener,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { createChart } from 'lightweight-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  @Input() data: { time: string; value: string }[];

  @ViewChild('chartRef', { static: true })
  chartRef: ElementRef;

  chart;
  lineSeries;

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

    this.lineSeries = this.chart.addAreaSeries({
      topColor: 'rgba(33, 150, 243, 0.4)',
      bottomColor: 'rgba(33, 150, 243, 0)',
      lineColor: 'rgba(33, 150, 243, 1)',
      lineWidth: 2,
      lineType: 2,
    });
    this.lineSeries.setData(this.data);

    this.chart.priceScale('right').applyOptions({
      visible: false,
    });

    this.chart.timeScale('right').applyOptions({
      visible: true,
    });
    this.chart.timeScale().fitContent();

    this.chart.timeScale().applyOptions({ fixLeftEdge: true });
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

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['data'].isFirstChange()) {
      this.lineSeries.setData(this.data);
    }
  }
}
