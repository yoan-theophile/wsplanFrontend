import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/core/model';
import { UserService } from 'src/app/modules/core/services/user.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'sex',
    'class',
    'action',
  ];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  UserList!: User[];
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUserList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUserList() {
    this.loading = true;
    this.userService
      .getList()
      .then((users: User[]) => {
        if (!users) return;
        this.UserList = users;

        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.UserList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.loading = false;
      })
      .catch((err) => {
        console.log(
          '📜 ~ file: student-list.component.ts ~ line 62 ~ StudentListComponent ~ this.userService.getList ~ err',
          err
        );
      });
  }

  onEdit(id: number) {
    this.router.navigateByUrl(`/registration/edit-student/${id}`);
  }

  // onDelete(id: number) {
  //   this.loading = true;
  //   this.userService
  //     .delete(id)
  //     .then(() => {
  //       this.loading = false;
  //       this.getUserList();
  //     })
  //     .catch((err) => {
  //       console.log(
  //         '📜 ~ file: planning-table-overview.component.ts ~ PlanningTableOverviewComponent ~ onDelete ~ err',
  //         err
  //       );
  //     });
  // }

  onToggleStatus(row: User) {
    this.loading = true;
    this.userService
      .toggleStatus(row)
      .then(() => {
        this.loading = false;
        this.getUserList();
      })
      .catch((err) => {
        console.log(
          '📜 ~ file: planning-table-overview.component.ts ~ PlanningTableOverviewComponent ~ onDelete ~ err',
          err
        );
        this.loading = false;
      });
  }
}
