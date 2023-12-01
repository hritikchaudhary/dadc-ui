import { Component, ViewChild } from '@angular/core';
import { AnalyticsService } from '../analytics.service';
import { MatTableDataSource } from '@angular/material/table';
import { AnalyticsResponse } from '../../dto/analytics.dto';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-analytics-dashboard',
  templateUrl: './analytics-dashboard.component.html',
  styleUrls: ['./analytics-dashboard.component.scss']
})
export class AnalyticsDashboardComponent {
  analyticsData: AnalyticsResponse = {
    totalResults: 0,
    uniqueUsers: 0,
    totalFailures: 0,
    pageNumber: 0,
    pageSize: 0,
    totalPages: 0,
    analyticsDTOList: []
  };
  selectedTimeFilter: string = 'last24';

  dataSource = new MatTableDataSource();
  startDate: Date | null = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));;
  endDate: Date | null = new Date();
  constructor(private analyticsService: AnalyticsService) { }
  pageSize = 10; // Number of items to load initially and on scroll
  currentPage = 0; // Current page number

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadInitialData();
    });
  }

  loadInitialData() {
    this.fetchAnalyticsData(this.currentPage, this.pageSize, this.startDate, this.endDate);
  }

  fetchAnalyticsData(page: number, size: number, startDate: Date | null, endDate: Date | null) {
    this.analyticsService.getAnalyticsData(page, size, startDate, endDate).subscribe(
      (data: AnalyticsResponse) => {
        this.analyticsData = data;
        this.dataSource.data = this.analyticsData.analyticsDTOList;
      },
      (error: any) => {
        console.error('Error fetching analytics data:', error);
      }
    );
  }

  handlePageChange(event: any) {
    const { pageIndex, pageSize } = event;
    this.fetchAnalyticsData(pageIndex, pageSize, this.startDate, this.endDate);
  }

  onTimeFilterChange() {
    const currentDate = new Date();
    if (this.selectedTimeFilter === 'last24') {
      this.startDate = new Date(currentDate.getTime() - (24 * 60 * 60 * 1000)); // 24 hours ago
      this.endDate = currentDate;
      this.loadInitialData();
    } else if (this.selectedTimeFilter === 'last7') {
      this.startDate = new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000)); // 7 days ago
      this.endDate = currentDate;
      this.loadInitialData();
    } else {
      this.startDate = null;
      this.endDate = null;
    }
  }
  onDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;

    if (type === 'start') {
      this.startDate = selectedDate;
    } else if (type === 'end') {
      this.endDate = selectedDate;
    }
    if(this.startDate && this.endDate){
      this.loadInitialData();
    }
  }
}
