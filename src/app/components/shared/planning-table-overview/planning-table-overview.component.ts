import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WorkingHourRange } from 'src/app/model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-planning-table-overview',
  templateUrl: './planning-table-overview.component.html',
  styleUrls: ['./planning-table-overview.component.scss'],
})
export class PlanningTableOverviewComponent implements AfterViewInit {
  displayedColumns: string[] = ['date', 'start_time', 'end_time'];
  dataSource: MatTableDataSource<WorkingHourRange> = new MatTableDataSource();
  workingHourRangeList!: WorkingHourRange[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService) {
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
    this.api
      .getWorkingHourRangeList()
      .subscribe((workingHourRangeList: WorkingHourRange[]) => {
        this.workingHourRangeList = workingHourRangeList;

        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.workingHourRangeList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

  }
}
