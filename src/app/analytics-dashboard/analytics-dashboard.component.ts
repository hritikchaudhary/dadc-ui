// analytics-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../analytics.service';
import { AnalyticsResponse } from '../../model/analytics.dto';

@Component({
  selector: 'app-analytics-dashboard',
  templateUrl: './analytics-dashboard.component.html',
  styleUrls: ['./analytics-dashboard.component.scss']
})
export class AnalyticsDashboardComponent implements OnInit {
  analyticsData: AnalyticsResponse = {
    totalResults: 0,
    uniqueUsers: 0,
    totalFailures: 0,
    pageNumber: 0,
    pageSize: 0,
    totalPages: 0,
    analyticsDTOList: []
  };

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    // Initial values for page and size
    const page = 0;
    const size = 20;
    this.fetchAnalyticsData(page, size);
  }

  fetchAnalyticsData(page: number, size: number) {
    this.analyticsService.getAnalyticsData(page, size).subscribe (
      (data: AnalyticsResponse) => {
        this.analyticsData.totalResults = data.totalResults;
        this.analyticsData.uniqueUsers = data.uniqueUsers;
        this.analyticsData.totalFailures = data.totalFailures;
        this.analyticsData.pageNumber = data.pageNumber;
        this.analyticsData.pageSize = data.pageSize;
        this.analyticsData.totalPages = data.totalPages;
        this.analyticsData.analyticsDTOList = data.analyticsDTOList;
      },
      (error: any) => {
        console.error('Error fetching analytics data:', error);
        console.log("kuch galat ho raha hai")
      }
    );
  }
}
