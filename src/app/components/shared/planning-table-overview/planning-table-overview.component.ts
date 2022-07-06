import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PlanningElement {
  id: string;
  start_time: string;
  end_time: string;
  date: Date;
}

/** Constants used to fill up our data base. */

const START_TIME: string[] = [
  "01:00 pm",
  "08:00 am",
  "02:00 pm",
  "04:00 pm",
];
const END_TIME: string[] = [
  "05:00 pm",
  "02:00 pm",
  "08:00 pm",
  "06:00 pm",
];

const DATE: Date[] = [new Date(), new Date(), new Date(), new Date()];

@Component({
  selector: 'app-planning-table-overview',
  templateUrl: './planning-table-overview.component.html',
  styleUrls: ['./planning-table-overview.component.scss'],
})
export class PlanningTableOverviewComponent implements AfterViewInit {
  displayedColumns: string[] = ['date', 'start_time', 'end_time'];
  dataSource: MatTableDataSource<PlanningElement>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    const planningElementList: PlanningElement[] = Array.from({ length: 5 }, (_, k) => ({
      id: k.toString(),
      date: DATE[k],
      start_time: START_TIME[k],
      end_time: END_TIME[k],
    }));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(planningElementList);
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
}

