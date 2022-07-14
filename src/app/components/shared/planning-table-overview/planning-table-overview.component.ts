import { Component, OnDestroy } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription, tap } from 'rxjs';
import { first } from 'rxjs/operators';
import { User, WorkingHourRange } from 'src/app/model';
import { WorkingHourRangeService } from 'src/app/services/working-hour-range.service';

@Component({
  selector: 'app-planning-table-overview',
  templateUrl: './planning-table-overview.component.html',
  styleUrls: ['./planning-table-overview.component.scss'],
})
export class PlanningTableOverviewComponent
  implements AfterViewInit, OnDestroy
{
  displayedColumns: string[] = ['date', 'start_time', 'end_time', 'action'];
  dataSource: MatTableDataSource<WorkingHourRange> = new MatTableDataSource();
  workingHourRangeList!: WorkingHourRange[];
  workingHourRangeListSubscriber!: Subscription;
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private workingHourRangeService: WorkingHourRangeService) {
    this.getWorkingHourRangeList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    if (this.workingHourRangeListSubscriber != null) {
      this.workingHourRangeListSubscriber.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getWorkingHourRangeList() {
    this.loading = true;
    this.workingHourRangeService.getList();

    this.workingHourRangeListSubscriber =
      this.workingHourRangeService.workingHourRangeList$.subscribe({
        next: (data) => {
          if (!data) return;
          this.workingHourRangeList = data;

          // Assign the data to the data source for the table to render
          this.dataSource = new MatTableDataSource(this.workingHourRangeList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.loading = false;
        },
        error: (err) => {
          console.log(
            '📜 ~ file: planning-table-overview.component.ts ~ PlanningTableOverviewComponent ~ getWorkingHourRangeList ~ err',
            err
          );
        },
      });
  }

  onDelete(id: number) {
    this.loading = true;
    this.workingHourRangeService
      .delete(id)
      .then(() => {
        this.loading = false;
        this.getWorkingHourRangeList();
      })
      .catch((err) => {
        console.log(
          '📜 ~ file: planning-table-overview.component.ts ~ PlanningTableOverviewComponent ~ onDelete ~ err',
          err
        );
      });
  }

  onEdit(row: WorkingHourRange) {
    this.workingHourRangeService.setCurrentWorkingHourRange(row);
  }
}
