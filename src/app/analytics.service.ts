// analytics.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnalyticsResponse, ChartData } from '../dto/analytics.dto';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private http: HttpClient) {}

  formatDate(date: Date | null): string {
    if (!date) {
      return '';
    }
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getAnalyticsData(
    page: number,
    size: number,
    startDate: Date | null,
    endDate: Date | null,
  ): Observable<AnalyticsResponse> {
    let apiUrl = `${environment.apiUrl}stats?page=${page}&size=${size}`;

    const startDateFormat = this.formatDate(startDate);
    const endDateFormat = this.formatDate(endDate);

    if (startDateFormat && endDateFormat) {
      apiUrl += `&startDate=${startDateFormat}&endDate=${endDateFormat}`;
    }

    return this.http.get<AnalyticsResponse>(apiUrl);
  }
  getChartAnalyticsData(
    startDate: Date | null,
    endDate: Date | null,
  ): Observable<ChartData> {
    let apiUrl = `${environment.apiUrl}statsByDate`;

    const startDateFormat = this.formatDate(startDate);
    const endDateFormat = this.formatDate(endDate);

    if (startDateFormat && endDateFormat) {
      apiUrl += `?startDate=${startDateFormat}&endDate=${endDateFormat}`;
    }

    return this.http.get<ChartData>(apiUrl);
  }
  postHelloData(userID: string, date: Date) {
    let apiUrl = `${environment.apiUrl}hello?userID=${userID}`;
    if (date) {
      apiUrl += `&createdAt=${this.formatDate(date)}`;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json', // Set the response type to text explicitly
    };
    return this.http.post(apiUrl, null, httpOptions);
  }
}
