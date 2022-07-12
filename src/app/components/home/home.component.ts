import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentUser!: User;
  users!: User[];

  constructor(
    protected userService: UserService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    // this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService
      .delete(id)
      .pipe(first())
      .subscribe(() => this.loadAllUsers());
  }

  private loadAllUsers() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe((users: any) => (this.users = users));
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
