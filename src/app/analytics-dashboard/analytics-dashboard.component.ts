import { Component, ViewChild } from '@angular/core';
import { AnalyticsService } from '../analytics.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AnalyticsResponse } from '../../dto/analytics.dto';
import { MatSortable } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DateRange } from 'src/dto/date-range.dto';
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
  customDateRange: DateRange = { startDate: null, endDate: null }; // Example DateRange model

  constructor(private analyticsService: AnalyticsService) { }
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
    this.fetchAnalyticsData(this.currentPage, this.pageSize);
  }

  fetchAnalyticsData(page: number, size: number) {
    this.analyticsService.getAnalyticsData(page, size).subscribe(
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
    this.fetchAnalyticsData(pageIndex, pageSize)
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
      const startDate = new Date(currentDate.getTime() - (24 * 60 * 60 * 1000)); // 24 hours ago
      this.customDateRange = { startDate, endDate: currentDate };
      console.log(this.customDateRange);
    } else if (this.selectedTimeFilter === 'last7') {
      const startDate = new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000)); // 7 days ago
      this.customDateRange = { startDate, endDate: currentDate };
      console.log(this.customDateRange);
    } else {
      this.customDateRange = { startDate: null, endDate: null };
    }
  }
  onDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;

    if (type === 'start') {
      this.customDateRange.startDate = selectedDate;
      console.log(this.customDateRange);
    } else if (type === 'end') {
      this.customDateRange.endDate = selectedDate;
      console.log(this.customDateRange);
    }
  }
}
