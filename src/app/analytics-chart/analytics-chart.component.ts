import { Component, Input } from "@angular/core";
import Chart from 'chart.js/auto';
import { AnalyticsService } from "../analytics.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-analytics-chart',
  templateUrl: './analytics-chart.component.html',
  styleUrls: ['./analytics-chart.component.scss']
})
export class AnalyticsChartComponent {

  @Input() startDate: any;
  @Input() endDate: any;
  @Input() totalCalls: any;
  @Input() totalFailures: any;
  @Input() totalUniqueUsers: any;
  ngOnChanges() {
    if (this.startDate && this.endDate) {
      this.handleDateRangeSelection(this.startDate, this.endDate, this.totalCalls, this.totalFailures);
    }
  }
  lineChart!: Chart;
  donutChart!: Chart;
  maxDate: Date = new Date(); // Set the max date to today


  constructor(private analyticsService: AnalyticsService, private _snackBar: MatSnackBar) { }

  // Function to create or recreate the lineChart
  private createChart(labels: string[], userData: number[], callData: number[], failureData: number[]) {

    const options = {
      responsive: true,
      maintainAspectRatio: false,
    };
    if (this.lineChart) {
      this.lineChart.destroy();
    }
    this.lineChart = new Chart('canvas', {
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
  private createDonutChart(callData: number[]) {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      hoverBackgroundColor: ['Green', 'Red'],
    };

    if (this.donutChart) {
      this.donutChart.destroy();
    }
    const donutData = {
      labels: ['Success', 'Failures'],
      datasets: [{
        data: callData,
        backgroundColor: ['#4CAF50', '#F44336'], // Assign different colors here
      }]
    };
    this.donutChart = new Chart('canvas2', {
      type: 'doughnut',
      data: donutData,
      options: options
    });
  }
  handleDateRangeSelection(startDate: Date, endDate: Date, totalCalls: number, totalFailures: number) {
    this.analyticsService.getChartAnalyticsData(startDate, endDate).subscribe(data => {
      this.createChart(data.chartLabels, data.uniqueUsers, data.totalNumberOfCalls, data.totalNumberOfFailures);
      this.createDonutChart(new Array(totalCalls-totalFailures, totalFailures));
    });
  }
  callAPI(formData: any) {
    const userId = formData.userId;
    const selectedDate = formData.selectedDate;

    console.log(userId);
    console.log("working");
    console.log(selectedDate);
    this.analyticsService.postHelloData(userId, selectedDate)
      .subscribe(
        (response) => {
          this._snackBar.open(response.toString(), '', {
            duration: 3000
          });
        },
        (error) => {
          let action = 'Error Logged';
          console.error('API Error:', error);
          this._snackBar.open(error.error.toString(),action, {
            duration: 3000
          });
        }
      );
  }
}
