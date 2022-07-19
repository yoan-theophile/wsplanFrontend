import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/core/services/authentication.service';
import { User, UserProfile } from '../../model';

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
  isStudentProfile: boolean = false;
  isManagerProfile: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.identifyProfile();
  }

  identifyProfile() {
    this.isStudentProfile = false;
    this.isManagerProfile = false;

    switch (this.authenticationService.currentUserProfile) {
      case UserProfile.Student:
        this.isStudentProfile = true;
        break;

      case UserProfile.Manager:
        this.isManagerProfile = true;
        break;

      default:
        break;
    }
  }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUser$.subscribe({
      next: (user) => {
        // After each subscription, we need to identify the new profile
        this.identifyProfile();

        if (this.authenticationService.loggedIn) {
          this.isLoggedIn = true;
          this.name = this.authenticationService.currentUserValue.firstName;
          this.class = this.authenticationService.currentUserValue.class;
        } else {
          this.isLoggedIn = false;
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
    this.router.navigateByUrl('login');
  }
}
