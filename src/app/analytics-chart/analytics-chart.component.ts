import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import Chart from 'chart.js/auto';
import { AnalyticsService } from "../analytics.service";

@Component({
  selector: 'app-analytics-chart',
  templateUrl: './analytics-chart.component.html',
  styleUrls: ['./analytics-chart.component.scss']
})
export class AnalyticsChartComponent{

  @Input() startDate: any;
  @Input() endDate: any;
  ngOnChanges(){
    if (this.startDate && this.endDate) {
      this.handleDateRangeSelection(this.startDate, this.endDate);
    }
  }
  chart!: Chart;
  title = 'ng-chart';

  constructor(private analyticsService:AnalyticsService ) { }

  // Function to create or recreate the chart
  private createChart(labels: string[], userData: number[], callData: number[], failureData: number[]) {

    const options = {
      responsive: true,
      maintainAspectRatio: false,
    };
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Users',
            data: userData,
            borderWidth: 1,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
          },
          {
            label: 'Calls',
            data: callData,
            borderWidth: 1,
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.1)',
          },
          {
            label: 'Failures',
            data: failureData,
            borderWidth: 1,
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
          },
        ],
      },
      options: options
    });
  }

  handleDateRangeSelection(startDate: Date, endDate: Date) {
    this.analyticsService.getChartAnalyticsData(startDate, endDate).subscribe(data => {
      this.createChart(data.chartLabels, data.uniqueUsers, data.totalNumberOfCalls, data.totalNumberOfFailures);
    });
  }
}
