import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  // Assume this method returns analytics data including the total number of unique users
  getAnalyticsData() {
    return {
      totalUniqueUsers: 7, // Sample value, replace it with your logic to get the actual data
      // Other analytics data...
    };
  }
}
