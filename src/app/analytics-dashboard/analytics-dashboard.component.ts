import { Component, ViewChild } from '@angular/core';
import { AnalyticsService } from '../analytics.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AnalyticsResponse } from '../../dto/analytics.dto';
import { MatSortable } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
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
  displayedColumns: string[] = ['createdAt', 'userID', 'status', 'errorMessage', 'request', 'response'];
  dataSource = new MatTableDataSource();
  startDate!: Date | null;
  endDate!: Date | null;
  constructor(private analyticsService: AnalyticsService) {
  }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 10; // Number of items to load initially and on scroll
  currentPage = 0; // Current page number

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.sort.sort(({ id: 'createdAt', start: 'desc' } as MatSortable));
      this.loadInitialData();
      this.onTimeFilterChange();
    });
  }

  loadInitialData() {
    console.log("triggerres");
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

  onPageChange(event: any) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.fetchAnalyticsData(pageIndex, pageSize, this.startDate, this.endDate)
  }

  getStatusClass(status: string): string {
    if (status === 'Success') {
      return 'success-status';
    } else if (status === 'Failure') {
      return 'failure-status';
    }
    return '';
  }

  onTimeFilterChange() {
    const currentDate = new Date(); // Get current date/time
    if (this.selectedTimeFilter === 'last24') {
      this.startDate = new Date(currentDate.getTime() - (24 * 60 * 60 * 1000)); // 24 hours ago
      this.endDate = currentDate;
    } else if (this.selectedTimeFilter === 'last7') {
      this.startDate = new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000)); // 7 days ago
      this.endDate = currentDate;
    } else {
      this.startDate = null;
      this.endDate = null;
    }
    this.loadInitialData();
  }
  onDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;

    if (type === 'start') {
      this.startDate = selectedDate;
    } else if (type === 'end') {
      this.endDate = selectedDate;
    }
    this.loadInitialData();
  }
}
