import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  name: string = '';
  class: string = '';
  currentUser!: Subscription;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUser$.subscribe({
      next: (user) => {
        if (
          JSON.stringify(this.authenticationService.currentUserValue) != '{}'
        ) {
          this.isLoggedIn = true;
          this.name = this.authenticationService.currentUserValue.firstName;
          this.class = this.authenticationService.currentUserValue.class;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.currentUser != null) {
      this.currentUser.unsubscribe();
    }
  }

  onLogout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/planning/login');
  }
}
