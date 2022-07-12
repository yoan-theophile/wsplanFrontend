import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, tap } from 'rxjs';
import { first } from 'rxjs/operators';
import { WorkingHourRange } from 'src/app/model';
import { WorkingHourRangeService } from 'src/app/services/working-hour-range.service';

@Component({
  selector: 'app-planning-table-overview',
  templateUrl: './planning-table-overview.component.html',
  styleUrls: ['./planning-table-overview.component.scss'],
})
export class PlanningTableOverviewComponent implements AfterViewInit {
  displayedColumns: string[] = ['date', 'start_time', 'end_time'];
  dataSource: MatTableDataSource<WorkingHourRange> = new MatTableDataSource();
  workingHourRangeList$!: Observable<any[]>;
  workingHourRangeList!: WorkingHourRange[];
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
    this.workingHourRangeList$ =
      this.workingHourRangeService.workingHourRangeList$;
    this.workingHourRangeList$.subscribe({
      next: (data) => {
        if (!data) return;
        this.workingHourRangeList = data;

        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.workingHourRangeList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
        this.loading = false;
      },
      error: () => {},
    });
    // .subscribe((workingHourRangeList: WorkingHourRange[]) => {
    //   this.workingHourRangeList = workingHourRangeList;

    //   // Assign the data to the data source for the table to render
    //   this.dataSource = new MatTableDataSource(this.workingHourRangeList);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // });
  }
}
