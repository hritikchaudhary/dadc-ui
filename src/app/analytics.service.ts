// analytics.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnalyticsResponse } from '../dto/analytics.dto';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(private http: HttpClient) {}

  getAnalyticsData(page: number, size: number): Observable<AnalyticsResponse> {
    const apiUrl = `${environment.apiUrl}stats?page=${page}&size=${size}`;
    return this.http.get<AnalyticsResponse>(apiUrl);
  }
}
