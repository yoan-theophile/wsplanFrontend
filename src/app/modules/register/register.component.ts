import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { User, UserRoleType } from 'src/app/modules/core/model';
import { AlertService } from 'src/app/modules/core/services/alert.service';
import { AuthenticationService } from 'src/app/modules/core/services/authentication.service';
import { UserService } from 'src/app/modules/core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (JSON.stringify(this.authenticationService.currentUserValue) != '{}') {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      class: ['', Validators.required],
      sex: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    this.userService
      .register(
        new User({
          role: UserRoleType.Student,
          email: this.f['email'].value,
          password: this.f['password'].value,
          token: 'fake-jwt-token',
          firstName: this.f['firstName'].value,
          lastLog: new Date().toISOString().split('T')[0],
          lastName: this.f['lastName'].value,
          sex: this.f['sex'].value,
          class: this.f['class'].value,
        })
      )
      .then((val) => {
        this.loading = false;
        this.router.navigateByUrl('/planning/login');
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  }
}
