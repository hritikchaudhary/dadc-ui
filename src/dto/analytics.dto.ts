// analytics.dto.ts

export class AnalyticsDTO {
  createdAt!: Date;
  userID!: string | null;
  status!: string;
  errorMessage!: string | null;
  request!: string | null;
  response!: string | null;
}

export class AnalyticsResponse {
  totalResults!: number;
  uniqueUsers!: number;
  totalFailures!: number;
  pageNumber!: number;
  pageSize!: number;
  totalPages!: number;
  analyticsDTOList!: AnalyticsDTO[];
}
