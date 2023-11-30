import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-analytics-dashboard',
  templateUrl: './analytics-dashboard.component.html',
  styleUrls: ['./analytics-dashboard.component.scss']
})
export class AnalyticsDashboardComponent implements OnInit {
  totalUniqueUsers: number;

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.fetchAnalyticsData();
  }

  fetchAnalyticsData() {
    const analyticsData = this.analyticsService.getAnalyticsData();
    this.totalUniqueUsers = analyticsData.totalUniqueUsers;
    // Fetch other analytics data if needed...
  }
}
