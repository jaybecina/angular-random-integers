import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { RandomNumber } from '../../models/random.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, NgxSkeletonLoaderModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @Input() numbers: RandomNumber[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() totalCount: number = 0;
  @Input() pageSize: number = 10;
  @Input() isLoading = false;
  @Output() pageChange = new EventEmitter<PageEvent>();

  formatDate(date: string): string {
    return moment(date).format('MMM DD, YYYY hh:mm:ss A');
  }

  onPageChange(event: any) {
    this.pageChange.emit(event);
  }
}
