import { Component, Input, SimpleChanges } from "@angular/core";
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-analytics-chart',
  templateUrl: './analytics-chart.component.html',
  styleUrls: ['./analytics-chart.component.scss']
})
export class AnalyticsChartComponent {

  @Input() filteredUserData: any;
  @Input() filteredCallData: any;
  @Input() filteredFailureData: any;
  @Input() selectedTimeFilter: any;
  @Input() startDate: any;
  @Input() endDate: any;

  chart!: Chart;
  title = 'ng-chart';

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["selectedTimeFilter"] && !changes["selectedTimeFilter"].firstChange && this.selectedTimeFilter !== 'custom') {
      // The selectedTimeFilter input has changed
      this.onTimeFilterChange();
    } else {
      if ((changes["startDate"] && !changes["startDate"].firstChange) || (changes["endDate"] && !changes["endDate"].firstChange)) {
        if (this.startDate && this.endDate) {
          this.onTimeFilterChange();
        }
      }
    }
  }


  ngOnInit() {
    this.updateChart(this.filteredUserData, this.filteredCallData, this.filteredFailureData);
  }

  onTimeFilterChange() {
    this.updateChart(this.filteredUserData, this.filteredCallData, this.filteredFailureData);
  }

  // Function to update the chart based on filter selection
  updateChart(filteredUserData: number[], filteredCallData: number[], filteredFailureData: number[]) {

    console.log(">>updatechart with ");
    console.log(this.selectedTimeFilter);
    let labels: string[] = [];
    let data: number[] = []; // Replace with your actual data

    // Generate labels and data based on the selected time filter or custom range
    if (this.selectedTimeFilter === 'last24') {
      labels = this.getLast24HoursLabels();
    } else if (this.selectedTimeFilter === 'last7') {
      labels = this.getLast7DaysLabels();
    } else if (this.selectedTimeFilter === 'custom') {
      labels = this.getCustomRangeLabels(this.startDate, this.endDate); // Implement logic to get labels for custom range
    }

    // Replace data with your actual data based on the labels generated above
    data = this.getChartData(labels.length);
    this.createChart(labels, filteredUserData, filteredCallData, filteredFailureData);

  }

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

  private getLast24HoursLabels(): string[] {
    // Logic to generate labels for the last 24 hours in reverse order from the current time
    const labels: string[] = [];
    const currentDate = new Date();

    for (let i = 0; i < 24; i++) {
      const hour = ('0' + (currentDate.getHours() - i)).slice(-2); // Calculate hour
      labels.unshift(`${hour}:00`);
    }

    return labels;
  }

  private getLast7DaysLabels(): string[] {
    // Logic to generate labels for the last 7 days without including the year
    const labels: string[] = [];
    const currentDate = new Date();

    for (let i = 0; i < 7; i++) {
      const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Get month (adding 1 as month is zero-based)
      const day = ('0' + currentDate.getDate()).slice(-2); // Get day

      labels.unshift(`${month}-${day}`);
      currentDate.setDate(currentDate.getDate() - 1);
    }

    return labels;
  }

  private getCustomRangeLabels(startDate: Date, endDate: Date): string[] {
    const labels: string[] = [];

    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Difference in days
    const numberOfParts = Math.min(diffDays, 10); // Divide into approximately 10 parts or based on days

      const daysPerPart = Math.ceil(diffDays / numberOfParts);
      let currentDate = new Date(startDate);

      for (let i = 0; i <= numberOfParts; i++) {
        labels.push(`${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)}`);
        currentDate.setDate(currentDate.getDate() + daysPerPart);
      }


    return labels;
  }

  private getChartData(length: number): number[] {
    // Replace this with your actual data for the generated labels
    // Generate random data for demonstration purposes
    const data: number[] = [];
    for (let i = 0; i < length; i++) {
      data.push(Math.floor(Math.random() * 100)); // Replace with your actual data
    }
    return data;
  }
}
