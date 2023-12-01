import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSortable } from '@angular/material/sort';

@Component({
  selector: 'app-analytics-table',
  templateUrl: './analytics-table.component.html',
  styleUrls: ['./analytics-table.component.scss']
})
export class AnalyticsTableComponent {

  @Input() analyticsData: any;
  @Output() pageChangeEvent = new EventEmitter<any>();
  @ViewChild(MatSort) sort!: MatSort;
  @Input() dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['createdAt', 'userID', 'status', 'errorMessage', 'request', 'response'];

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.sort.sort(({ id: 'createdAt', start: 'desc' } as MatSortable));
    });
  }
  onPageChange(event: any) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.pageChangeEvent.emit({ pageIndex, pageSize });
  }

  getStatusClass(status: string): string {
    if (status === 'Success') {
      return 'success-status';
    } else if (status === 'Failure') {
      return 'failure-status';
    }
    return '';
  }

}
