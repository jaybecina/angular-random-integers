import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RandomService } from '../../services/random.service';
import { PaginatedResponse, RandomNumber } from '../../models/random.model';
import { Table } from '../table/table';
import { Chart } from '../chart/chart';
import { Dialog } from '../dialog/dialog';

@Component({
  selector: 'app-random',
  standalone: true,
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    MatButtonModule,
    MatPaginatorModule,
    Table,
    Chart,
    MatDialogModule,
  ],
  templateUrl: './random.html',
  styleUrl: './random.css',
})
export class Random {
  numbers: RandomNumber[] = [];
  displayedColumns: string[] = ['value', 'generator_user', 'created'];
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  latest20: { name: number; value: number }[] = [];
  isLoading = false;

  constructor(private randomService: RandomService, private dialog: MatDialog) {}

  ngOnInit() {
    this.isLoading = true;
    this.loadNumbers();
    this.randomService.testJsonPlaceholder();
  }

  loadNumbers(page: number = 0) {
    const offset = page * this.pageSize;
    this.isLoading = true;

    // Load table data
    this.randomService
      .getNumbers(this.pageSize, offset)
      .subscribe((res: PaginatedResponse<RandomNumber>) => {
        this.numbers = res.results;
        this.totalCount = res.count;
        // Only set loading to false after both table and chart data are loaded
      });

    // Load chart data
    this.randomService.getNumbers(20, 0).subscribe((res: PaginatedResponse<RandomNumber>) => {
      this.latest20 = res.results
        .map((item: RandomNumber, i: number) => ({
          name: i + 1,
          value: item.value,
        }))
        .reverse();
      // Set loading to false after both requests complete
      this.isLoading = false;
    });
  }

  generate() {
    this.isLoading = true;
    this.randomService.generateNumber().subscribe({
      next: (res: RandomNumber) => {
        this.isLoading = false;
        this.dialog.open(Dialog, {
          data: { number: res?.value },
        });
        this.loadNumbers(this.currentPage);
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.loadNumbers(this.currentPage);
  }
}
